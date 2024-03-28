interface IAction {
  Icon: any;
  name: string;
  isOn: boolean;
  relayName: string;
  send: (message: string) => void;
}
export default function Action({ Icon, name, isOn, relayName, send }: IAction) {
  function onClick() {
    let payload: any = {};
    payload[relayName] = !isOn;
    send(JSON.stringify(payload));
  }
  return (
    <div className={`action ${isOn ? "ON" : ""}`} onClick={onClick}>
      <div className="action-icon">
        <Icon />
      </div>
      <div className="action-name">{name}</div>
    </div>
  );
}
