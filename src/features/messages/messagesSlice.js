import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_CONVERSATIONS } from '../../data/mockMessages';

const loadSavedConversations = () => {
  try {
    const saved = localStorage.getItem('motomarket_conversations');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading conversations from localStorage:', e);
  }
  return INITIAL_CONVERSATIONS;
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    conversations: loadSavedConversations(),
    activeConversationId: 'conv-1',
    searchQuery: ''
  },
  reducers: {
    setActiveConversationId: (state, action) => {
      state.activeConversationId = action.payload;
      const conv = state.conversations.find(c => c.id === action.payload);
      if (conv) {
        conv.unreadCount = 0;
      }
      try {
        localStorage.setItem('motomarket_conversations', JSON.stringify(state.conversations));
      } catch (e) {
        console.error(e);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    sendMessage: (state, action) => {
      const { conversationId, text, isSender = true } = action.payload;
      const conv = state.conversations.find(c => c.id === conversationId);
      if (conv) {
        const newMsg = {
          id: 'msg-' + Date.now(),
          senderId: isSender ? 'user-current' : conv.participant.id,
          text,
          timestamp: 'Just now',
          isSender
        };
        conv.messages.push(newMsg);
        conv.lastActivity = 'Just now';
        if (!isSender) {
          conv.unreadCount += 1;
        }
        try {
          localStorage.setItem('motomarket_conversations', JSON.stringify(state.conversations));
        } catch (e) {
          console.error(e);
        }
      }
    },
    startConversationWithSeller: (state, action) => {
      const { motorcycle, seller, initialMessage } = action.payload;
      
      // Check if conversation already exists for this motorcycle and seller
      let existingConv = state.conversations.find(
        c => c.motorcycleId === motorcycle.id && c.participant.id === seller.id
      );

      if (existingConv) {
        state.activeConversationId = existingConv.id;
        if (initialMessage) {
          existingConv.messages.push({
            id: 'msg-' + Date.now(),
            senderId: 'user-current',
            text: initialMessage,
            timestamp: 'Just now',
            isSender: true
          });
          existingConv.lastActivity = 'Just now';
        }
      } else {
        const newConvId = 'conv-' + Date.now();
        const newConv = {
          id: newConvId,
          motorcycleId: motorcycle.id,
          motorcycleTitle: `${motorcycle.year} ${motorcycle.brand} ${motorcycle.model}`,
          motorcyclePrice: motorcycle.price,
          motorcycleImage: motorcycle.images && motorcycle.images[0] ? motorcycle.images[0] : '',
          participant: {
            id: seller.id || 'seller-' + Date.now(),
            name: seller.name,
            role: 'Verified Seller',
            avatar: seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            online: true,
            phone: seller.phone
          },
          unreadCount: 0,
          lastActivity: 'Just now',
          messages: initialMessage ? [
            {
              id: 'msg-' + Date.now(),
              senderId: 'user-current',
              text: initialMessage,
              timestamp: 'Just now',
              isSender: true
            }
          ] : []
        };
        state.conversations.unshift(newConv);
        state.activeConversationId = newConvId;
      }

      try {
        localStorage.setItem('motomarket_conversations', JSON.stringify(state.conversations));
      } catch (e) {
        console.error(e);
      }
    }
  }
});

export const {
  setActiveConversationId,
  setSearchQuery,
  sendMessage,
  startConversationWithSeller
} = messagesSlice.actions;

export default messagesSlice.reducer;
