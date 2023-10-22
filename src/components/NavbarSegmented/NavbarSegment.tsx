import { useState } from 'react';
import { SegmentedControl, Text } from '@mantine/core';
import {
    IconShoppingCart,
    IconLicense,
    IconMessage2,
    IconFile3d,
    IconMessages,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconUsers,
    IconFileAnalytics,
    IconDatabaseImport,
    IconChartHistogram,
    IconReceiptRefund,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import classes from './NavbarSegmented.module.css';

interface NavbarSegmentedProps {
    section: 'account' | 'general';
    onSectionChange: (section: 'account' | 'general') => void;
}

const tabs = {
    account: [
        { link: '', label: 'Modelo', icon: IconFile3d },
    ],
    general: [
        { link: '', label: 'Graficas', icon: IconUsers },
    ],
};

export function NavbarSegmented({ section, onSectionChange }: NavbarSegmentedProps) {


    const [active, setActive] = useState('Billing');

    const links = tabs[section].map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div>
                <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
                    Laboratorio 8 Grupo 1
                </Text>

                <SegmentedControl
                    value={section}
                    onChange={(value: 'account' | 'general') => onSectionChange(value)}
                    transitionTimingFunction="ease"
                    fullWidth
                    data={[
                        { label: 'Modelo', value: 'account' },
                        { label: 'Graficas', value: 'general' },
                    ]}
                />
            </div>

            <div className={classes.navbarMain}>{links}</div>


        </nav>
    );
}