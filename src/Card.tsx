interface ICardProps {
  name: string;
  description: string;
  Icon: any;
  Unit: string;
  title: string;
  value: any;
}
export default function Card(props: ICardProps) {
  const { name, description, Icon, Unit, title, value } = props;
  return (
    <div className="card">
      <div className="headline">
        <span className="card-icon">
          <Icon />
        </span>
        <span className="card-title">
          <span className="card-title-text">{name}</span>
          <span className="card-title-description">{description}</span>
        </span>
      </div>
      <div className="bottomline">
        <div className="sensor-type">{title}</div>
        <div className="sensor-value">
          {value} {Unit}
        </div>
      </div>
    </div>
  );
}
