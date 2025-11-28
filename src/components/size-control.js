import {__} from '@wordpress/i18n';
import { 
    Button,
    Icon, 
    __experimentalUnitControl as UnitControl,
    Flex,  FlexItem,
 } from '@wordpress/components';
 import {useState, useEffect } from '@wordpress/element';
 import { link, linkOff } from '@wordpress/icons';


const SizeControl = ( props ) => {
    const { label, value, onChange, multi=false } = props;

    const [ sync, setSync ] = useState(null);

    useEffect(() => {
      if (value){
        if(value.indexOf(" ") > -1) {
          const _vals = value.split(" ");
          if(_vals.length === 2){
            setSync('opposite');
          }
          else{
            setSync('none');
          }
        }
        else {
            setSync('all');
        }
      }
    }, [value, multi]);

    let vals = [];
    if(value && value.indexOf(' ') > -1){
        vals = value.split(' ');
    }

    const expectedLen = sync === 'all' ? 1 : ( sync === 'opposite' ? 2 : 4 );
    // Ensure we have exactly expectedLen values
    while (vals.length < expectedLen) {
        vals.push(value || null);
    }
    while (vals.length > expectedLen) {
        vals.pop();
    }

    const setVal = ( index, val ) => {
        let newVals = [ ...vals ];
        newVals[index] = val;
        onChange( newVals.join(' ') );
    };

    const handleChangeSync = ( ) => {
        if ( multi ) {
            if(sync === 'all'){
                setSync( 'opposite' );
                onChange(`${vals[0]} ${vals[1]}`);
            }
            else if(sync === 'opposite'){
                setSync('none');
            }
            else{
                setSync( 'all' );
                onChange( vals[0] );
            }
        } else {
            setSync( 'all' );
            onChange( vals[0] );
        }
    }

    const valLabels = [
        __('Top'),
        __('Right'),
        __('Bottom'),
        __('Left'),
    ]

    const units = [
        { value: 'px', label: 'px', default: 2 },
        { value: '%', label: '%', default: 0 },
        { value: 'em', label: 'em', default: 1 },
        { value: 'rem', label: 'rem', default: 1 },
    ];

    return (
      <Flex direction="column" gap={1}>
        {multi && (
          <Flex>
            <FlexItem>{label}</FlexItem>
            <FlexItem>
              <Button 
                onClick={handleChangeSync} size="small"
                variant={sync === "none" ? "primary" : "secondary"}
              >
                <Icon icon={sync === "all" ? link : linkOff}/>
              </Button>
            </FlexItem>
          </Flex>
        )}
        {!multi || sync==='all' ? (
          <UnitControl
            label={label}
            value={value}
            onChange={onChange}
            labelPosition="side"
            units={units}
            isResetValueOnUnitChange={true}
          />
        ) : (
          <Flex direction="column" gap={2}>
            {vals.map((val, index) => (
              <FlexItem key={index}>
                <UnitControl
                  label={valLabels[index]}
                  value={val || value}
                  onChange={(v) => setVal(index, v)}
                  labelPosition="side"
                  units={units}
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

