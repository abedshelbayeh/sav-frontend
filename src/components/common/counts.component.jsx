// styles
import * as Styled from "./counts.styles";

const Counts = ({ counts = [] }) => {
  return (
    <Styled.Container>
      {counts.map(({ title, count }) => (
        <Styled.Count key={title}>
          <span>{title}</span>
          <span className="count">{count}</span>
        </Styled.Count>
      ))}
    </Styled.Container>
  );
};

export default Counts;
