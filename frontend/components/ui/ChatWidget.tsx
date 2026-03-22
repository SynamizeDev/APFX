'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, ChevronDown, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ChatWidget.module.css'

type Message = {
    id: string
    text: string
    sender: 'bot' | 'user'
    options?: string[]
    showForm?: boolean
}

const WIDGET_DELAY = 1000 // 1s typing delay

const INITIAL_GREETING = "Hi there 👋\nWelcome to APFX Support.\n\nHow can we assist you today?"
const MAIN_OPTIONS = [
    'Open an Account',
    'Account Types',
    'Trading Platforms',
    'Deposits & Withdrawals',
    'Spreads & Fees',
    'Verification (KYC)',
    'Promotions & Rebates',
    'Contact Support',
    'Other Query'
]

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Initialize chat when opened for the first time
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { id: 'msg-0', text: INITIAL_GREETING, sender: 'bot', options: MAIN_OPTIONS }
            ])
        }
    }, [isOpen, messages.length])

    // Auto-scroll to bottom of conversation
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const appendBotMessage = (text: string, options?: string[], showForm = false) => {
        setIsTyping(true)
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { id: `msg-${Date.now()}`, text, sender: 'bot', options, showForm }
            ])
            setIsTyping(false)
        }, WIDGET_DELAY)
    }

    const handleOptionSelect = (option: string) => {
        // First append user message
        setMessages(prev => [
            ...prev,
            { id: `msg-${Date.now()}-user`, text: option, sender: 'user' }
        ])

        // Then process response based on option
        switch (option) {
            /* ── Main Menu ── */
            case 'Open an Account':
                appendBotMessage(
                    "Opening an APFX trading account takes just a few minutes.\n\nYou can begin the registration process here.",
                    ['Start Registration', 'Back to Menu']
                )
                break
            case 'Account Types':
                appendBotMessage(
                    "APFX offers three account types designed for different traders.",
                    ['Standard Account', 'Premium Account', 'Elite Account']
                )
                break
            case 'Trading Platforms':
                appendBotMessage(
                    "APFX provides powerful trading platforms designed for speed and reliability.",
                    ['Web Terminal', 'TradingView', 'Mobile Trading', 'Copy Trading', 'Back to Menu']
                )
                break
            case 'Deposits & Withdrawals':
                appendBotMessage(
                    "APFX supports several deposit and withdrawal methods depending on your region.",
                    ['Deposit Methods', 'Withdrawal Time', 'Minimum Deposit', 'Fees', 'Back to Menu']
                )
                break
            case 'Spreads & Fees':
                appendBotMessage(
                    "APFX offers competitive spreads with institutional liquidity.",
                    ['Standard Spreads', 'Premium Spreads', 'Trading Commission', 'Back to Menu']
                )
                break
            case 'Verification (KYC)':
                appendBotMessage(
                    "To activate your account you must complete identity verification.",
                    ['Required Documents', 'Verification Time', 'Upload Documents', 'Back to Menu']
                )
                break
            case 'Promotions & Rebates':
                appendBotMessage(
                    "High-volume traders can qualify for volume rebates and custom pricing.",
                    ['Volume Rebates', 'VIP Program', 'Partner Program', 'Back to Menu']
                )
                break
            case 'Contact Support':
                appendBotMessage(
                    "You can contact the APFX support team directly.",
                    ['Email Support', 'Live Agent', 'Schedule Call', 'Back to Menu']
                )
                break
            case 'Other Query':
                appendBotMessage(
                    "Please provide some details, and our team will get back to you.",
                    undefined,
                    true // trigger form
                )
                break

            /* ── Sub Menu Responses ── */
            // Account Types Sub
            case 'Standard Account':
                appendBotMessage("Standard\n\n- Spreads from 1.0 pips\n- No commissions\n- Minimum deposit $50", ['Back to Menu'])
                break
            case 'Premium Account':
                appendBotMessage("Premium\n\n- Spreads from 0.0 pips\n- Commission $3.5 per lot\n- Minimum deposit $1,000\n- Institutional liquidity access", ['Back to Menu'])
                break
            case 'Elite Account':
                appendBotMessage("Elite\n\n- Custom liquidity solutions\n- Dedicated account manager\n- Volume rebates\n- Minimum deposit $5,000", ['Back to Menu'])
                break
            
            // Platforms Sub
            case 'Web Terminal':
                appendBotMessage("Web Terminal\n\nTrade directly from your browser with advanced charting and one-click trading.", ['Back to Menu'])
                break
            case 'TradingView':
                appendBotMessage("TradingView\n\nTrade directly from TradingView charts using professional analysis tools.", ['Back to Menu'])
                break

            // Funding Sub
            case 'Deposit Methods':
                appendBotMessage("Deposit Methods\n\n- Bank transfers\n- Credit/Debit cards\n- Regional payment methods", ['Back to Menu'])
                break
            case 'Withdrawal Time':
                appendBotMessage("Withdrawal Time\n\nMost withdrawals are processed within 24 hours.", ['Back to Menu'])
                break

            // Form Submit / Links
            case 'Start Registration':
                // Virtual Navigation
                window.location.href = '/register'
                appendBotMessage("Redirecting to registration...", ['Back to Menu'])
                break
            case 'Back to Menu':
                appendBotMessage(INITIAL_GREETING, MAIN_OPTIONS)
                break
            default:
                // Catch all fallback
                appendBotMessage("I can certainly help with that. Is there anything else you'd like to explore?", ['Back to Menu', 'Contact Support'])
                break
        }
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
        appendBotMessage("Thank you! Our support team will contact you shortly.", ['Back to Menu'])
    }

    return (
        <div className={styles.chatWidgetContainer}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className={styles.chatPanel}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerInfo}>
                                <div className={styles.headerTitle}>
                                    <Sparkles size={16} color="var(--color-accent)" />
                                    APFX Support
                                </div>
                                <div className={styles.headerSubtitle}>We usually reply instantly</div>
                            </div>
                            <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label="Close chat">
                                <ChevronDown size={20} />
                            </button>
                        </div>

                        {/* Conversation */}
                        <div className={styles.conversation} ref={scrollRef}>
                            {messages.map((msg, index) => {
                                const isLastBot = msg.sender === 'bot' && index === messages.filter(m => m.sender === 'bot').length - 1
                                return (
                                    <motion.div 
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`${styles.messageRow} ${styles[msg.sender]}`}
                                    >
                                        <div className={`${styles.message} ${styles[msg.sender]}`}>
                                            {msg.text}
                                            
                                            {/* Options */}
                                            {msg.options && (
                                                <div className={styles.optionsWrapper}>
                                                    {msg.options.map(opt => (
                                                        <button 
                                                            key={opt}
                                                            className={styles.optionButton}
                                                            onClick={() => handleOptionSelect(opt)}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Optional Form */}
                                            {msg.showForm && !formSubmitted && (
                                                <form className={styles.queryForm} onSubmit={handleFormSubmit}>
                                                    <input type="text" placeholder="Name" required className={styles.formInput} />
                                                    <input type="email" placeholder="Email" required className={styles.formInput} />
                                                    <textarea placeholder="Message" required className={styles.formInput} />
                                                    <button type="submit" className={styles.formSubmit}>Submit</button>
                                                </form>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className={`${styles.messageRow} ${styles.bot}`}
                                >
                                    <div className={`${styles.message} ${styles.bot}`}>
                                        <div className={styles.typingIndicator}>
                                            <div className={styles.dot}></div>
                                            <div className={styles.dot}></div>
                                            <div className={styles.dot}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <button 
                className={styles.triggerButton} 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Talk to Agent"
            >
                {!isOpen && <span className={styles.triggerLabel}>Talk to Agent</span>}
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    )
}
