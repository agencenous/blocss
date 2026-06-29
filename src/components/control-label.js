import { BaseControl } from "@wordpress/components";

const ControlLabel = ({ label }) => {
    return <BaseControl.VisualLabel style={{margin: "0.1em"}}>{label}</BaseControl.VisualLabel>;
};

export default ControlLabel;