import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const SettingsContext = createContext(null);

const getStoredBoolean = (key, defaultValue) => {
    const value = localStorage.getItem(key);

    if (value === null) {
        return defaultValue;
    }

    return value === "true";
};

export const SettingsProvider = ({ children }) => {

    const [theme, setTheme] = useState(
        () => localStorage.getItem("axel_theme") || "dark"
    );

    const [enterToSend, setEnterToSend] = useState(() =>
        getStoredBoolean("axel_enter_to_send", true)
    );

    const [typingAnimation, setTypingAnimation] = useState(() =>
        getStoredBoolean("axel_typing_animation", true)
    );

    const [autoScroll, setAutoScroll] = useState(() =>
        getStoredBoolean("axel_auto_scroll", true)
    );

    const [desktopNotifications, setDesktopNotifications] = useState(() =>
        getStoredBoolean("axel_desktop_notifications", false)
    );

    const [sound, setSound] = useState(() =>
        getStoredBoolean("axel_notification_sound", false)
    );

    const [saveHistory, setSaveHistory] = useState(() =>
        getStoredBoolean("axel_save_history", true)
    );


    /* ================= THEME ================= */

    useEffect(() => {
        const root = document.documentElement;

        // Remove previous theme classes
        root.classList.remove("dark", "light");

        // Apply selected theme
        if (theme === "dark") {
            root.classList.add("dark");
        }

        else if (theme === "light") {
            root.classList.add("light");
        }

        else {
            // System theme
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

            root.classList.add(
                prefersDark ? "dark" : "light"
            );
        }

        localStorage.setItem(
            "axel_theme",
            theme
        );

    }, [theme]);


    /* ================= SAVE SETTINGS ================= */

    useEffect(() => {
        localStorage.setItem(
            "axel_enter_to_send",
            String(enterToSend)
        );
    }, [enterToSend]);


    useEffect(() => {
        localStorage.setItem(
            "axel_typing_animation",
            String(typingAnimation)
        );
    }, [typingAnimation]);


    useEffect(() => {
        localStorage.setItem(
            "axel_auto_scroll",
            String(autoScroll)
        );
    }, [autoScroll]);


    useEffect(() => {
        localStorage.setItem(
            "axel_desktop_notifications",
            String(desktopNotifications)
        );
    }, [desktopNotifications]);


    useEffect(() => {
        localStorage.setItem(
            "axel_notification_sound",
            String(sound)
        );
    }, [sound]);


    useEffect(() => {
        localStorage.setItem(
            "axel_save_history",
            String(saveHistory)
        );
    }, [saveHistory]);


    /* ================= NOTIFICATIONS ================= */

    const requestNotifications = async () => {

        if (!("Notification" in window)) {
            return false;
        }

        if (Notification.permission === "granted") {
            return true;
        }

        if (Notification.permission === "denied") {
            return false;
        }

        const permission =
            await Notification.requestPermission();

        return permission === "granted";
    };


    const notify = (title, body) => {

        if (
            desktopNotifications &&
            "Notification" in window &&
            Notification.permission === "granted"
        ) {
            new Notification(title, {
                body,
            });
        }

        if (sound) {
            playNotificationSound();
        }
    };


    const playNotificationSound = () => {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) return;

            const audioContext = new AudioContext();

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.frequency.value = 700;
            oscillator.type = "sine";

            gain.gain.setValueAtTime(
                0.08,
                audioContext.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.15
            );

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.15
            );

        } catch (error) {
            console.error(
                "Notification sound failed:",
                error
            );
        }
    };


    /* ================= CLEAR HISTORY ================= */

    const clearHistory = () => {

        localStorage.removeItem("axel_messages");
        localStorage.removeItem("axel_recent_chats");
    };


    return (
        <SettingsContext.Provider
            value={{
                theme,
                setTheme,

                enterToSend,
                setEnterToSend,

                typingAnimation,
                setTypingAnimation,

                autoScroll,
                setAutoScroll,

                desktopNotifications,
                setDesktopNotifications,

                sound,
                setSound,

                saveHistory,
                setSaveHistory,

                requestNotifications,
                notify,

                clearHistory,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};


export const useSettings = () => {

    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error(
            "useSettings must be used inside SettingsProvider"
        );
    }

    return context;
};