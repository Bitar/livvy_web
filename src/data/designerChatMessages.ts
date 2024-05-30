import {DesignerChatMessage} from "../models/designer-chat/DesignerChatMessage.ts";

export const designerChatMessages: DesignerChatMessage[] = [
    {
        source: 'bot',
        timestamp: '8:13 PM',
        text: 'Hi there! I\'m Shea McGee, co-founder of Studio McGee and star of Netflix\'s \'Dream Home Makeover.\' I\'m passionate about creating beautiful, functional spaces that reflect your personal style. Whether it\'s a cozy' +
            ' living room, a functional kitchen, or a serene bedroom, I\'m here to help you transform your space. Let\'s start by talking about which room you\'d like to redesign. Which room are you focusing on today?',
        isLoading: false
    },
    {
        source: 'user',
        timestamp: '8:16 PM',
        text: 'Lorem ipsum dolar sit amet.',
        isLoading: false
    },
    {
        source: 'bot',
        timestamp: '8:17 PM',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?',
        isLoading: false
    }
]