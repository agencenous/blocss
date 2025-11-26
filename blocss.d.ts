declare module '@agencenous/blocss' {
    import { ComponentType } from 'react';

    interface StyleControlProps {
        value: Record<string, any>;
        onChange: (newValue: Record<string, any>) => void;
        typography?: boolean;
        color?: {
            text?: boolean;
            background?: boolean;
            border?: boolean;
        };
    }

    export const StyleControl: ComponentType<StyleControlProps>;
}