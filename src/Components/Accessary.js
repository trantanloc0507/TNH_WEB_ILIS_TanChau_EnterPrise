import React, { } from 'react';
import COLOR from "../Styles/Colors";
import { NeutralColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import { TooltipHost, IconButton, PrimaryButton, CommandBarButton, DirectionalHint, getTheme, Stack, Spinner, Icon, Text } from '@fluentui/react';
import URL from "../Containers/MainController";
const theme = getTheme();

export const BaseButton = props => {
    return (
        <TooltipHost
            content={props.tooltip}
            styles={{ root: { display: 'inline-block' } }}
            directionalHint={DirectionalHint.bottomCenter}
        >
            <PrimaryButton text={props.title} allowDisabledFocus styles={styles.addButton} split />
        </TooltipHost>
    )
};

export const CommandButton = props => {
    return (
        <TooltipHost
            content={props.tooltip}
            styles={{ root: { display: 'inline-block' } }}
            directionalHint={DirectionalHint.bottomCenter}
        >
            <CommandBarButton onClick={props.onClick} iconProps={{ iconName: props.iconName }} text={props.title} styles={styles.processButton} />
        </TooltipHost>
    )
};

export const AppButton = props => {
    const typeServer = localStorage.getItem(URL.serverSelected)
    if (props.iconName === 'ServerProcesses') {
        return (
            <TooltipHost
                content={props.tooltip}
                styles={{ root: { display: 'inline-block' } }}
            >
                <Stack style={{ flexDirection: 'column' }}>
                    <IconButton
                        styles={styles.iconButtonViTri(props.active, window.innerWidth)}
                        onClick={props.onClick}
                    >
                        <Stack>
                            <Icon iconName={props.iconName} styles={{
                                root: {
                                    color: 'white', fontSize: 10, marginTop: 3
                                }
                            }} />
                            <Text style={styles.titleHeader(window.innerWidth)}>{typeServer === 'tnh' ? 'TNH' : 'Enterprise'}</Text>
                        </Stack>
                    </IconButton>
                </Stack>
            </TooltipHost>
        )

    } else {
        return (
            <TooltipHost
                content={props.tooltip}
                styles={{ root: { display: 'inline-block' } }}

            >
                <IconButton
                    iconProps={{ iconName: props.iconName }}
                    styles={styles.iconButton(props.active)}
                    onClick={props.onClick}
                />
            </TooltipHost>
        )
    }
};

export const HorizontalDivider = () => {
    return (
        <div style={styles.horizontalDivider} />
    )
};

export const VerticalDivider = () => {
    return (
        <div style={styles.verticalDivider} />
    )
};

export const MenuItem = props => {
    return (
        <CommandBarButton
            className='col'
            iconProps={{ iconName: props.iconName }}
            text={props.title}
            styles={styles.menuItem}
            checked={props.checked}
        />
    )
};

export const Loading = () => {
    return (
        <Stack styles={styles.loadingContainer}>
            <Spinner label="Đang tải..." />
        </Stack>
    )
}

export const Error = ({ message }) => {
    return (
        <Stack styles={styles.loadingContainer}>
            <Icon iconName={'Error'} styles={styles.errorIcon} />
            <Text variant={'medium'}>{message}</Text>
        </Stack>
    )
}


const styles = {
    addButton: {
        menuIcon: {

        },
        label: {
            fontSize: 12
        }
    },
    processButton: {
        root: {
            height: 32,
            backgroundColor: COLOR.transparent,
            marginRight: 3,
            width: '100%',
            marginTop: -50
        },
        label: {
            fontSize: 12,
            color: COLOR.blue,
            textAlign: 'left'
        },
        icon: {
            fontSize: 16
        }
    },
    iconButton: (active, iscircle) => ({
        root: {
            height: 48,
            width: 48,
            backgroundColor: active ? COLOR.darkBlue : 'transparent',
            borderRadius: 0
        },
        rootHovered: {
            backgroundColor: COLOR.darkBlue
        },
        rootPressed: {
            backgroundColor: COLOR.darkBlue
        },
        icon: {
            color: COLOR.white,
            fontSize: 16
        },
        iconHovered: {
            color: active ? COLOR.blue : COLOR.white,
        },
        iconPressed: {
            opacity: .6
        }
    }),
    horizontalDivider: {
        height: 1,
        width: '100%',
        backgroundColor: COLOR.border
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: COLOR.border
    },
    menuItem: {
        root: {
            height: 36,
            backgroundColor: COLOR.transparent,
            width: '100%'
        },
        label: {
            textAlign: 'left',
            marginLeft: 10,
            fontSize: 12
        },
        icon: {
            textAlign: 'center',
            color: theme.palette.themePrimary
        },
        rootChecked: {
            backgroundColor: theme.palette.themeLight
        },
        labelChecked: {
            color: theme.palette.themePrimary,
            fontWeight: '600'
        },
        rootCheckedHovered: {
            backgroundColor: theme.palette.themeLight
        },
        iconChecked: {
            color: theme.palette.themePrimary
        }
    },
    loadingContainer: {
        root: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 30px'
        }
    },
    loadingSpin: {
        root: {
            padding: '10px 20px',
            border: '1px solid #eee'
        }
    },
    errorIcon: {
        root: {
            fontSize: 80,
            color: NeutralColors.gray90
        }
    },
    iconButtonViTri: (active, e) => ({
        root: {
            height: 48,
            width: e < 400 ? 50 : 65,
            backgroundColor: active ? COLOR.darkBlue : 'transparent',
            borderRadius: 0,
        },
        rootHovered: {
            backgroundColor: COLOR.darkBlue
        },
        rootPressed: {
            backgroundColor: COLOR.darkBlue
        },
        iconHovered: {
            color: active ? COLOR.blue : COLOR.white,
        },
        iconPressed: {
            opacity: .6
        }
    }),
    titleHeader: (e) => ({
        fontSize: e < 400 ? 7 : 8,
        color: "white",
        fontWeight: 'bold'
    }),
};
