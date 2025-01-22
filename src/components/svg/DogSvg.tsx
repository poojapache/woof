export default function DogSvg({
  width,
  height,
  fill,
  className,
  d1,
  d2,
  d3,
}: {
  width: number;
  height: number;
  fill: string;
  className?: string;
  d1: string;
  d2: string;
  d3: string;
}): JSX.Element {
  return (
    <svg
      height={height}
      width={width}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 957.751 957.751"
      className={className}
    >
      <g>
        <g>
          <path fill={fill} d={d1}></path>
          <path fill={fill} d={d2}></path>
          <path fill={fill} d={d3}></path>
        </g>
      </g>
    </svg>
  );
}
