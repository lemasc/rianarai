import Svg, { SvgProps, Path, LinearGradient, Stop, RadialGradient } from 'react-native-svg'

const ClassroomIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 578.9 500" width="24" height="24" {...props}>
    <Path fill="#0F9D58" d="M52.6 52.6h473.7v394.7H52.6V52.6z" />
    <Path
      fill="#57BB8A"
      d="M394.7 263.2c16.4 0 29.6-13.3 29.6-29.6S411 204 394.7 204s-29.6 13.3-29.6 29.6 13.3 29.6 29.6 29.6zm0 19.7c-31.7 0-65.8 16.8-65.8 37.6v21.6h131.6v-21.6c0-20.8-34.1-37.6-65.8-37.6zm-210.5-19.7c16.4 0 29.6-13.3 29.6-29.6S200.5 204 184.2 204s-29.6 13.3-29.6 29.6 13.3 29.6 29.6 29.6zm0 19.7c-31.7 0-65.8 16.8-65.8 37.6v21.6H250v-21.6c0-20.8-34.1-37.6-65.8-37.6z"
    />
    <Path
      fill="#F7F7F7"
      d="M289.5 236.8c21.8 0 39.5-17.7 39.4-39.5 0-21.8-17.7-39.5-39.5-39.4-21.8 0-39.4 17.7-39.4 39.5s17.7 39.4 39.5 39.4zm0 26.4c-44.4 0-92.1 23.6-92.1 52.6v26.3h184.2v-26.3c0-29.1-47.7-52.6-92.1-52.6z"
    />
    <Path fill="#F1F1F1" d="M342.1 421.1h118.4v26.3H342.1v-26.3z" />
    <Path
      fill="#F4B400"
      d="M539.5 0h-500C17.7 0 0 17.7 0 39.5v421.1C0 482.3 17.7 500 39.5 500h500c21.8 0 39.5-17.7 39.5-39.5v-421C578.9 17.7 561.3 0 539.5 0zm-13.2 447.4H52.6V52.6h473.7v394.8z"
    />
    <Path
      opacity={0.2}
      fill="#FFF"
      d="M539.5 0h-500C17.7 0 0 17.7 0 39.5v3.3C0 21 17.7 3.3 39.5 3.3h500C561.3 3.3 579 21 579 42.8v-3.3C578.9 17.7 561.3 0 539.5 0z"
    />
    <Path
      opacity={0.2}
      fill="#BF360C"
      d="M539.5 496.7h-500C17.7 496.7 0 479 0 457.2v3.3C0 482.3 17.7 500 39.5 500h500c21.8 0 39.5-17.7 39.5-39.5v-3.3c-.1 21.8-17.7 39.5-39.5 39.5z"
    />
    <LinearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={154.865}
      y1={295.747}
      x2={154.865}
      y2={282.634}
      gradientTransform="matrix(12.992 0 0 -4 -1584.623 1631.087)"
    >
      <Stop offset={0} stopColor="#bf360c" stopOpacity={0.2} />
      <Stop offset={1} stopColor="#bf360c" stopOpacity={0.02} />
    </LinearGradient>
    <Path fill="url(#a)" d="M460.3 447.4H341.9l52.6 52.6h118.3l-52.5-52.6z" />
    <Path opacity={0.2} fill="#263238" d="M52.6 49.3h473.7v3.3H52.6v-3.3z" />
    <Path opacity={0.2} fill="#FFF" d="M52.6 447.4h473.7v3.3H52.6v-3.3z" />
    <RadialGradient
      id="b"
      cx={131.401}
      cy={367.2}
      r={18.197}
      gradientTransform="matrix(38.0002 0 0 -38 -4973.328 13965.323)"
      gradientUnits="userSpaceOnUse"
    >
      <Stop offset={0} stopColor={'#fff'} stopOpacity={0.1} />
      <Stop offset={1} stopColor={'#fff'} stopOpacity={0} />
    </RadialGradient>
    <Path
      fill="url(#b)"
      d="M539.5 0h-500C17.7 0 0 17.7 0 39.5v421.1C0 482.3 17.7 500 39.5 500h500c21.8 0 39.5-17.7 39.5-39.5v-421C578.9 17.7 561.3 0 539.5 0z"
    />
  </Svg>
)

export default ClassroomIcon
