
import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textWhite: '#FFFFFF',
        textRed: '#d73a4a',
        primary: '#0366d6',
        mainBackground: '#FFFFFF',
        secondBackground: '#24292e'
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;