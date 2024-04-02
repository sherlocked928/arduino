import Card from "./Card";
import List from "./Icons/List";
import Sensor from "./assets/temperature-sensor.svg?react";
import Ultrasonic from "./assets/ultrasonic-distance-sensor.svg?react";
// import Tv from "./assets/old-tv.svg?react";
import Gas from "./assets/touch-sensor.svg?react";
import IR from "./assets/sound-sensor.svg?react";
import LDR from "./assets/light-sensor.svg?react";
import Bulb from "./assets/electric-light-bulb.svg?react";
import BulbOff from "./assets/offbulb.svg?react";
import ArrowUp from "./assets/arrow-up-small.svg?react";
import ArrowDown from "./assets/arrow-down-small.svg?react";
// import PowerPlug from "./assets/plug-outlet.svg?react";
import Action from "./Action";
import useSockets from "./Sockets";
function App() {
  const { appState, SEND } = useSockets();
  const { temperature, humidity, ir, ldr, distance, gasLevel } =
    appState.sensors;
  const { relai1, relai2, relai3, relai4 } = appState.relays;
  return (
    <>
      <header>
        <div className="banner">
          <h1>Arduino Project</h1>
          <span className="burger-icon">
            <List />
          </span>
        </div>
      </header>
      <main>
        <div className="cards">
          <Card
            Icon={Sensor}
            name={"DHT11"}
            description="a basic, ultra low-cost digital temperature and humidity sensor"
            title="Temperature"
            value={temperature}
            Unit={"°C"}
          />
          <Card
            Icon={Sensor}
            name={"DHT11"}
            description="a basic, ultra low-cost digital temperature and humidity sensor"
            title="Humidity"
            value={humidity}
            Unit={"%"}
          />
          <Card
            Icon={Ultrasonic}
            name={"Ultrasonic HC-SR04"}
            description="an instrument that measures the distance to an object using ultrasonic sound waves"
            title="Proximity"
            value={distance}
            Unit={"CM"}
          />
          <Card
            Icon={LDR}
            name={"LDR"}
            description="An LDR is a passive electronic sensor that detects light."
            title="Resistance"
            value={ldr}
            Unit={"Ohms"}
          />
          <Card
            name="FC-22"
            Icon={Gas}
            description="Gas sensor is a device which detects the concentration level of the gases present in the atmosphere"
            title="Gas Leak"
            value={gasLevel}
            Unit=""
          />
          <Card
            name="IR LM393"
            Icon={IR}
            description="Photoelectric sensor module is a sensor module which you can use to identify the distance between obstacles."
            title="IR"
            value={ir ? "✅" : "❌"}
            Unit=""
          />
        </div>
        {/* <div className="auto-mode">
          <label htmlFor="autoMode">Mode Automatique</label>
          <input type="checkbox" id="autoMode" className="switch" />
        </div> */}
        <div className="action-container">
          <Action
            Icon={!relai1 ? Bulb : BulbOff}
            name="Lampe - 1"
            isOn={relai1}
            relayName="relay1"
            send={SEND}
          />
          <Action
            Icon={!relai2 ? Bulb : BulbOff}
            name="Lampe - 2"
            isOn={relai2}
            relayName="relay2"
            send={SEND}
          />
          <Action
            Icon={ArrowUp}
            name="Monter"
            isOn={relai3}
            relayName="relay3"
            send={SEND}
          />
          <Action
            Icon={ArrowDown}
            name="Descendre"
            isOn={relai4}
            relayName="relay4"
            send={SEND}
          />
          {/* <Action
            Icon={PowerPlug}
            name="Prise"
            isOn={relai5}
            relayName="relay5"
            send={SEND}
          /> */}
        </div>
      </main>
    </>
  );
}

export default App;
