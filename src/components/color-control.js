import { Button, ColorPalette, Dropdown } from '@wordpress/components';

const ColorControl = ( { label, value, colors, onChange, enableAlpha } ) => {
    return (
        <Dropdown
        renderToggle={ ( { isOpen, onToggle } ) => (
            <Button
                onClick={ onToggle }
                aria-expanded={ isOpen }
                variant="secondary"
            >
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    backgroundColor: value,
                    display: 'inline-block',
                    marginRight: '8px',
                    verticalAlign: 'middle',
                    border: '1px solid #000'
                }}></div>
                {label}
            </Button>
        ) }
        renderContent={ () => 
                <ColorPalette
                    label={ label }
                    value={ value }
                    colors={colors}
                    onChange={ onChange }
                    enableAlpha={ enableAlpha }
                />
            }
        />
    );
}

export default ColorControl;