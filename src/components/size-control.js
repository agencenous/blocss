import {__} from '@wordpress/i18n';
import { 
    Button,
    Icon, 
    __experimentalUnitControl as UnitControl,
    Flex,  FlexItem,
 } from '@wordpress/components';
 import {useState } from '@wordpress/element';
 import { link, linkOff } from '@wordpress/icons';


const SizeControl = ( props ) => {
    const { label, value, onChange, multi=false } = props;

    const [ sync, setSync ] = useState(false);

    let vals = [];
    if(value && value.indexOf(' ') !== -1){
        vals = value.split(' ');
    }
    // Ensure we have exactly four values for multi
    while (vals.length < 4) {
        vals.push(value);
    }

    const setVal = ( index, val ) => {
        let newVals = [ ...vals ];
        newVals[index] = val;
        onChange( newVals.join(' ') );
    };

    const handleChangeSync = ( ) => {
        const newSync = !sync;
        setSync( newSync );
        if ( newSync ) {
            onChange( vals[0] );
        }
    }

    const valLabels = [
        __('Top'),
        __('Right'),
        __('Bottom'),
        __('Left'),
    ]

    return (
        <Flex direction="column" gap={1}>
        { multi && (
            <Flex>
                <FlexItem>
                    {label}
                </FlexItem>
                <FlexItem>
                    <Button onClick={handleChangeSync} size="small">
                        <Icon icon={ sync ? link : linkOff } />
                    </Button>
                </FlexItem>
            </Flex>
        ) }
        { (!multi || sync) ? (
            <UnitControl
                label={ label }
                value={ value }
                onChange={ onChange }
                labelPosition="side"
                units={ [
                    { value: 'px', label: 'px', default: 0 },
                    { value: '%', label: '%', default: 0 },
                    { value: 'em', label: 'em', default: 0 },
                ] }
                isResetValueOnUnitChange={true}
                />
            ) : (
                <Flex direction="column" gap={2}>
                {vals.map( ( val, index ) => (
                    <FlexItem key={index}>
                        <UnitControl
                            label={ valLabels[index] }
                            value={ val || value }
                            onChange={ (v) => setVal(index, v) }
                            labelPosition="side"
                            units={ [
                                { value: 'px', label: 'px', default: 0 },
                                { value: '%', label: '%', default: 0 },
                                { value: 'em', label: 'em', default: 0 },
                            ] }
                            size="small"
                            isResetValueOnUnitChange={true}
                        />
                    </FlexItem>
            ))}
            </Flex>
        )}
        </Flex>
    );
}

export default SizeControl;

