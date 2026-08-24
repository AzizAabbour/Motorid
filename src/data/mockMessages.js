export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    motorcycleId: 'moto-1',
    motorcycleTitle: '2024 Yamaha YZF-R1',
    motorcyclePrice: 18500,
    motorcycleImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=300&q=80',
    participant: {
      id: 'seller-1',
      name: 'Alex Rossi',
      role: 'Verified Seller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      online: true,
      phone: '+1 (555) 234-8901'
    },
    unreadCount: 1,
    lastActivity: '10:45 AM',
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-current',
        text: 'Hi Alex! Is the 2024 Yamaha YZF-R1 still available for viewing this weekend?',
        timestamp: '10:30 AM',
        isSender: true
      },
      {
        id: 'msg-2',
        senderId: 'seller-1',
        text: 'Hello! Yes, it is still available. I have it stored in my clean garage in Los Angeles. Saturday afternoon around 2 PM would be perfect.',
        timestamp: '10:38 AM',
        isSender: false
      },
      {
        id: 'msg-3',
        senderId: 'seller-1',
        text: 'Does Saturday 2 PM work for your schedule? I can also send a cold-start video if you would like to hear the Akrapovič exhaust.',
        timestamp: '10:45 AM',
        isSender: false
      }
    ]
  },
  {
    id: 'conv-2',
    motorcycleId: 'moto-2',
    motorcycleTitle: '2023 Ducati Panigale V4 S',
    motorcyclePrice: 28900,
    motorcycleImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=300&q=80',
    participant: {
      id: 'seller-2',
      name: 'Marco Bellini (Ducati Specialist)',
      role: 'Official Dealer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      online: true,
      phone: '+1 (555) 789-3412'
    },
    unreadCount: 0,
    lastActivity: 'Yesterday',
    messages: [
      {
        id: 'msg-201',
        senderId: 'user-current',
        text: 'Hello Marco, does the Panigale V4 S include the original Ducati passenger seat kit as well?',
        timestamp: 'Yesterday, 3:15 PM',
        isSender: true
      },
      {
        id: 'msg-202',
        senderId: 'seller-2',
        text: 'Ciao! Yes, all OEM factory parts including the passenger pegs, pillion seat, and Ducati battery tender are included in the original boxes.',
        timestamp: 'Yesterday, 3:22 PM',
        isSender: false
      }
    ]
  },
  {
    id: 'conv-3',
    motorcycleId: 'moto-8',
    motorcycleTitle: '2024 Honda CRF1100L Africa Twin',
    motorcyclePrice: 17999,
    motorcycleImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80',
    participant: {
      id: 'seller-8',
      name: 'Desert Moto Adventures',
      role: 'Verified Dealership',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      online: false,
      phone: '+1 (555) 345-9876'
    },
    unreadCount: 0,
    lastActivity: 'Feb 18',
    messages: [
      {
        id: 'msg-301',
        senderId: 'user-current',
        text: 'Hi, are the aluminum side cases keyed to the motorcycle ignition key?',
        timestamp: 'Feb 18, 11:10 AM',
        isSender: true
      },
      {
        id: 'msg-302',
        senderId: 'seller-8',
        text: 'Yes they are! Honda one-key system configured. Ready for turnkey touring.',
        timestamp: 'Feb 18, 11:40 AM',
        isSender: false
      }
    ]
  }
];
