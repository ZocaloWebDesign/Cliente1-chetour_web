import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { siteInfo } from '@/data'

export function WhatsappButton() {
  return (
    <motion.a
      href={`https://wa.me/${siteInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-4 text-white shadow-lg shadow-[#25D366]/30"
      aria-label="Consultar por WhatsApp"
    >
      <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
      <span className="hidden text-sm font-semibold sm:inline">Consultar ahora</span>
    </motion.a>
  )
}
