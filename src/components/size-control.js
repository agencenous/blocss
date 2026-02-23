import { __ } from '@wordpress/i18n';
import {
    Button,
    Icon,
    __experimentalUnitControl as UnitControl,
    Flex,
    FlexItem,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
    closeSmall,
    create,
    link,
    linkOff,
    sidesTop,
    sidesRight,
    sidesBottom,
    sidesLeft,
} from "@wordpress/icons";

const SizeControl = (props) => {
    const { label, value, onChange, multi = false } = props;
    const [sync, setSync] = useState('all');
    
    const modeValuesRef = useRef({
        all: null,
        opposite: null,
        none: null,
    });

    const parseValue = (val) => {
        if (!val) return [null, null, null, null];

        const parts = val.trim().split(/\s+/);

        switch (parts.length) {
            case 1:
                return [parts[0], parts[0], parts[0], parts[0]];
            case 2:
                return [parts[0], parts[1], parts[0], parts[1]];
            case 3:
                return [parts[0], parts[1], parts[2], parts[1]];
            case 4:
                return [parts[0], parts[1], parts[2], parts[3]];
            default:
                return [null, null, null, null];
        }
    };

    const getSyncMode = (val) => {
        if (!val) return 'all';

        const parts = val.trim().split(/\s+/);

        if (parts.length === 1) return 'all';
        if (parts.length === 2) return 'opposite';
        return 'none';
    };

     useEffect(() => {
        if (value) {
            const mode = getSyncMode(value);
            setSync(mode);
            modeValuesRef.current[mode] = value;
        }
    }, []);

    useEffect(() => {
        if (value && sync) {
            modeValuesRef.current[sync] = value;
        }
    }, [value]);

    const vals = parseValue(value);

    const setVal = (index, val) => {
        let newVals = [...vals];
        newVals[index] = val;

        if (sync === 'all') {
            const newValue = val;
            modeValuesRef.current.all = newValue;
            onChange(newValue);
        } else if (sync === 'opposite') {
            if (index === 0 || index === 2) {
                newVals[0] = val;
                newVals[2] = val;
            } else {
                newVals[1] = val;
                newVals[3] = val;
            }
            const newValue = `${newVals[0] || '0px'} ${newVals[1] || '0px'}`;
            modeValuesRef.current.opposite = newValue;
            onChange(newValue);
        } else {
            const newValue = `${newVals[0] || '0px'} ${newVals[1] || '0px'} ${newVals[2] || '0px'} ${newVals[3] || '0px'}`;
            modeValuesRef.current.none = newValue;
            onChange(newValue);
        }
    };

    const handleChangeSync = () => {
        if (!multi) {
            setSync('all');
            onChange(vals[0]);
            return;
        }

        let nextMode;
        if (sync === 'all') {
            nextMode = 'opposite';
        } else if (sync === 'opposite') {
            nextMode = 'none';
        } else {
            nextMode = 'all';
        }

        modeValuesRef.current[sync] = value;

        let nextValue = modeValuesRef.current[nextMode];
        
        if (!nextValue) {
            const currentVals = parseValue(value);
            if (nextMode === 'all') {
                nextValue = currentVals[0] || '0px';
            } else if (nextMode === 'opposite') {
                nextValue = `${currentVals[0] || '0px'} ${currentVals[1] || '0px'}`;
            } else {
                nextValue = `${currentVals[0] || '0px'} ${currentVals[1] || '0px'} ${currentVals[2] || '0px'} ${currentVals[3] || '0px'}`;
            }
            modeValuesRef.current[nextMode] = nextValue;
        }

        setSync(nextMode);
        onChange(nextValue);
    };

    const valIcons = [sidesTop, sidesRight, sidesBottom, sidesLeft];

    const units = [
        { value: 'px', label: 'px', default: 2 },
        { value: '%', label: '%', default: 0 },
        { value: 'em', label: 'em', default: 1 },
        { value: 'rem', label: 'rem', default: 1 },
    ];

    const getIndicesToShow = () => {
        if (sync === 'all') return [0];
        if (sync === 'opposite') return [0, 1];
        return [0, 1, 2, 3];
    };

    const indicesToShow = getIndicesToShow();

    return (
        <Flex direction="column" gap={1}>
            {!value ? (
                <Button onClick={() => onChange("2px")} size="small">
                    <Icon icon={create} />
                    {label}
                </Button>
            ) : (
                <>
                    {multi && (
                        <Flex justify="space-between" align="center">
                            <FlexItem>{label}</FlexItem>
                            <FlexItem>
                                <Flex gap={1}>
                                    <Button
                                        onClick={handleChangeSync}
                                        size="small"
                                        variant={sync === "none" ? "primary" : "secondary"}
                                    >
                                        <Icon icon={sync === "all" ? link : linkOff} />
                                    </Button>
                                    <Button onClick={() => onChange(null)} size="small">
                                        <Icon icon={closeSmall} />
                                    </Button>
                                </Flex>
                            </FlexItem>
                        </Flex>
                    )}

                    {sync === 'all' ? (
                        <UnitControl
                            label={!multi ? label : null}
                            value={value}
                            onChange={(v) => {
                                modeValuesRef.current.all = v;
                                onChange(v);
                            }}
                            labelPosition="side"
                            units={units}
                            isResetValueOnUnitChange={true}
                        />
                    ) : (
                        <Flex direction="column" gap={2} style={{ marginTop: '8px' }}>
                            {indicesToShow.map((index) => (
                                <FlexItem key={index}>
                                    <UnitControl
                                        label={<Icon icon={valIcons[index]} size={24} />}
                                        value={vals[index] || ''}
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
                </>
            )}
        </Flex>
    );
};

export default SizeControl;