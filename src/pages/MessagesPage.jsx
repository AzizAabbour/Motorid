import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Search,
  ArrowLeft,
  Phone,
  MoreVertical,
  Check,
  CheckCheck,
  Circle
} from 'lucide-react';
import {
  setActiveConversationId,
  setSearchQuery,
  sendMessage
} from '../features/messages/messagesSlice';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function MessagesPage() {
  const dispatch = useDispatch();
  const { conversations, activeConversationId, searchQuery } = useSelector(state => state.messages);
  const [newMessage, setNewMessage] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const filteredConversations = conversations.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.participant.name.toLowerCase().includes(q) ||
      c.motorcycleTitle?.toLowerCase().includes(q) ||
      c.messages.some(m => m.text.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages?.length]);

  const handleSelectConversation = (id) => {
    dispatch(setActiveConversationId(id));
    setMobileShowChat(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;
    dispatch(sendMessage({ conversationId: activeConversationId, text: newMessage.trim() }));
    setNewMessage('');
  };

  return (
    <div className="page-container">
      <section className="page-hero" style={{ paddingBottom: '16px' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="section-tag"><MessageSquare size={14} /> Messages</span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="page-title">
              Your <span style={{ color: 'var(--primary)' }}>Conversations</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: '8px' }}>
        <div className="container">
          <div className="messages-layout">
            {/* Sidebar – Conversation List */}
            <div className={`messages-sidebar ${mobileShowChat ? 'hide-mobile' : ''}`}>
              <div className="messages-sidebar-header">
                <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  Messages ({conversations.length})
                </h3>
              </div>
              <div style={{ padding: '0 12px 12px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '13px', height: '38px' }}
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  />
                </div>
              </div>
              <div className="conversations-list">
                {filteredConversations.length === 0 ? (
                  <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                    No conversations found
                  </div>
                ) : (
                  filteredConversations.map(conv => (
                    <div
                      key={conv.id}
                      className={`conversation-item ${conv.id === activeConversationId ? 'active' : ''}`}
                      onClick={() => handleSelectConversation(conv.id)}
                    >
                      <div className="conversation-avatar">
                        <img src={conv.participant.avatar} alt={conv.participant.name} />
                        {conv.participant.online && <span className="online-dot" />}
                      </div>
                      <div className="conversation-info">
                        <div className="conversation-top-row">
                          <span className="conversation-name">{conv.participant.name}</span>
                          <span className="conversation-time">{conv.lastActivity}</span>
                        </div>
                        <div className="conversation-preview">
                          {conv.messages.length > 0
                            ? conv.messages[conv.messages.length - 1].text.substring(0, 50) + (conv.messages[conv.messages.length - 1].text.length > 50 ? '...' : '')
                            : 'No messages yet'
                          }
                        </div>
                        {conv.motorcycleTitle && (
                          <div className="conversation-moto-tag">
                            {conv.motorcycleTitle}
                          </div>
                        )}
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="conversation-unread">{conv.unreadCount}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Panel */}
            <div className={`messages-chat ${mobileShowChat ? 'show-mobile' : ''}`}>
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="chat-header">
                    <button
                      className="btn-icon-sm chat-back-btn"
                      onClick={() => setMobileShowChat(false)}
                      aria-label="Back to conversations"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div className="conversation-avatar" style={{ width: '38px', height: '38px' }}>
                      <img src={activeConversation.participant.avatar} alt={activeConversation.participant.name} />
                      {activeConversation.participant.online && <span className="online-dot" />}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{activeConversation.participant.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {activeConversation.participant.online ? 'Online' : 'Offline'} · {activeConversation.participant.role}
                      </div>
                    </div>
                    {activeConversation.participant.phone && (
                      <a href={`tel:${activeConversation.participant.phone}`} className="btn-icon-sm" title="Call">
                        <Phone size={16} />
                      </a>
                    )}
                  </div>

                  {/* Motorcycle context bar */}
                  {activeConversation.motorcycleTitle && (
                    <div className="chat-moto-context">
                      {activeConversation.motorcycleImage && (
                        <img src={activeConversation.motorcycleImage} alt="" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{activeConversation.motorcycleTitle}</div>
                        {activeConversation.motorcyclePrice && (
                          <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>
                            ${activeConversation.motorcyclePrice?.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="chat-messages">
                    {activeConversation.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`chat-bubble ${msg.isSender ? 'sender' : 'receiver'}`}
                      >
                        <div className="bubble-text">{msg.text}</div>
                        <div className="bubble-meta">
                          <span>{msg.timestamp}</span>
                          {msg.isSender && <CheckCheck size={13} />}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form className="chat-input-area" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="form-input"
                      style={{ flexGrow: 1 }}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      disabled={!newMessage.trim()}
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--text-muted)',
                  gap: '12px',
                  padding: '40px'
                }}>
                  <MessageSquare size={48} strokeWidth={1.2} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Select a conversation
                  </h3>
                  <p style={{ fontSize: '14px', textAlign: 'center', maxWidth: '300px' }}>
                    Choose a conversation from the list to start messaging.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
