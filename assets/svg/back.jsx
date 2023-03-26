import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const SVGComponent = (props) => (
  <Svg
    fill='#000000'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={27}
    height={27}
    viewBox='0 0 45.58 45.58'
    xmlSpace='preserve'
    {...props}
  >
    <G>
      <Path d='M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113 c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909 c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313 c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z' />
    </G>
  </Svg>
)
const BackIcon = React.memo(SVGComponent)
export default BackIcon
