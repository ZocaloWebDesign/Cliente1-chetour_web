import * as THREE from 'three'

// Realza la foto satelital real (más saturada y luminosa) manteniendo sus
// tonos originales, para un look tipo "Google Earth": tierra y océano
// reales, con relieve real gracias a la iluminación de la escena.
export function buildStylizedEarthTexture(image: HTMLImageElement) {
  const w = 2048
  const h = 1024
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(image, 0, 0, w, h)

  let imgData: ImageData
  try {
    imgData = ctx.getImageData(0, 0, w, h)
  } catch {
    return new THREE.CanvasTexture(canvas)
  }

  const data = imgData.data
  const SAT = 1.55
  const BRIGHT = 1.25
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const l = 0.299 * r + 0.587 * g + 0.114 * b
    data[i] = Math.min(255, Math.max(0, (l + (r - l) * SAT) * BRIGHT))
    data[i + 1] = Math.min(255, Math.max(0, (l + (g - l) * SAT) * BRIGHT))
    data[i + 2] = Math.min(255, Math.max(0, (l + (b - l) * SAT) * BRIGHT))
  }
  ctx.putImageData(imgData, 0, 0)
  return new THREE.CanvasTexture(canvas)
}

// Aro fino tipo Fresnel: solo se ve en el borde del globo, como la atmósfera
// real vista desde el espacio.
export function buildAtmosphereMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(0.55, 0.8, 1.0, 1.0) * intensity;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  })
}
