import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'عربي' }
];

const Selector = () => {
    const { i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;
    const [restsrtApp, setRestartApp] = useState()

    useEffect(() => {
        if (restsrtApp) {
            setTimeout(() => {
                RNRestart.Restart();
            }, 1000);
        }
    }, [restsrtApp])


    const setLanguage = code => {
        if (code === 'ar') {
            i18n.locale = 'ar';
            I18nManager.forceRTL(true)
            I18nManager.allowRTL(true)
            setRestartApp(true)

        } else {
            i18n.locale = 'en';
            I18nManager.forceRTL(false)
            I18nManager.allowRTL(false)
            setRestartApp(true)
        }
        return i18n.changeLanguage(code);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Select a Language</Text>
                {/* <Ionicons color='#444' size={28} name='ios-language-outline' /> */}
            </View>
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;

                return (
                    <Pressable
                        key={language.code}
                        style={styles.buttonContainer}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    >
                        <Text
                            style={[selectedLanguage ? styles.selectedText : styles.text]}
                        >
                            {language.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#444',
        fontSize: 28,
        fontWeight: '600'
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 18,
        color: '#000',
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'tomato',
        paddingVertical: 4
    }
});

export default Selector;