import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme-context/ThemeContext';

export default function useTheme() {
    const themeInfo = useContext(ThemeContext);
    return themeInfo;
}
