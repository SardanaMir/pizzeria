import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="118" r="117" /> 
    <rect x="9" y="257" rx="15" ry="15" width="267" height="33" /> 
    <rect x="236" y="297" rx="0" ry="0" width="16" height="1" /> 
    <rect x="8" y="304" rx="11" ry="11" width="265" height="89" /> 
    <rect x="11" y="409" rx="11" ry="11" width="68" height="33" /> 
    <rect x="55" y="439" rx="0" ry="0" width="2" height="0" /> 
    <rect x="95" y="409" rx="10" ry="10" width="174" height="33" />
  </ContentLoader>
)

export default Skeleton