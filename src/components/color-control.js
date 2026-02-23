import { Button, ColorPalette, Dropdown } from '@wordpress/components';

const ColorControl = ({ label, value, colors, onChange, enableAlpha }) => {
    return (
        <div style={{ marginBottom: '12px' }}>
            <Dropdown
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        variant="secondary"
                    >
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '10px',
                            backgroundColor: value || '#fff',
                            display: 'inline-block',
                            marginRight: '8px',
                            verticalAlign: 'middle',
                            border: '1px solid #ccc'
                        }}></div>
                        {label}
                    </Button>
                )}
                renderContent={() =>
                    <ColorPalette
                        label={label}
                        value={value}
                        colors={colors}
                        onChange={onChange}
                        enableAlpha={enableAlpha}
                    />
                }
            />
        </div>
    );
};

export default ColorControl;