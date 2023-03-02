// https://stackoverflow.com/questions/54121536/typescript-module-svg-has-no-exported-member-reactcomponent#answer-54122106
declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
