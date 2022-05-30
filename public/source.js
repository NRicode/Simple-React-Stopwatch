const LapContext = React.createContext();

function Header(){
	
	return <div style={{backgroundColor: "rgb(25,25,25)", minHeight: "5em", display: "flex", alignItems: "center", justifyContent: "center"}}>
	
	<label style={{fontSize: "2em", color:"rgb(255,165,0)"}}>Counter app</label>
	
	</div>
	
}

function Btn(arg){
	
	return <div onClick={arg.click} className="btn" style={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", width: "275px", height: "6em", outline: "1px solid orange"}}>
				<p style={{color:"rgb(255,165,0)", fontSize: "2em"}}>{arg.val}</p>
			</div>
	
}

function Control(arg){
	
	let [start, setStart] = React.useState(false);
	let [timerList, setTimerList] = React.useContext(LapContext);
	
	let [startTime, setStartTime] = React.useState(null);
	let [curTime, setCurTime] = React.useState(null);
	let [handleInterval, setHandleInterval] = React.useState(null);
	function startClicked(){

		
		if(start){
			
			setStart(false);
			logic.stopTimer(arg.setter);

			
		}else{
			
			setStart(true);
			logic.startTimer(arg.setter);

		}
		
		
	}
	
	function addTimers(){
		
		if (start) setTimerList([...timerList, logic.getLap()]);
		
	}

	return <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, 275px)", justifyContent: "center", gridColumn: "span 3"}}>
				<Btn val={start? "Stop" : "Start"} click={startClicked}/>
				<Btn val="Lap" click={addTimers}/>
			</div>
	
}

function Lap(arg){
	
	function remove(){
		arg.remove(arg.idx)
	}
	
	return <center><div className="lap" style={{width: "100%", height: "4.5em", marginBottom: "0.25em", marginTop: "0.25em", borderRadius: "15px", backgroundColor: "rgb(30,30,30)"}}>
		
		<div style={{display: "flex"}}>
			<div onClick={function(){remove()}} className="btn" style={{display: "flex", alignItems: "center", justifyContent: "center", height: "4.5em", width: "5em"}}><svg width="24" height="24" viewBox="0 0 24 24"><path fill="rgb(100, 100, 100)" d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></div>
			<div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "4.5em", width: "5em", flexGrow: "1"}}><span style={{fontSize: "2em", color: "yellow"}}>{arg.val}</span></div>
		</div>
		
			
	</div></center>
	
}

function Data(arg){
	
	let [timerList, setTimerList] = React.useContext(LapContext);
	
	React.useEffect(()=>{
		
		let item = localStorage.getItem("save");
		
		if(item != null){
			
			setTimerList(JSON.parse(item));
			
		}
		
	},[]);
	
	React.useEffect(()=>{
		
		localStorage.setItem("save", JSON.stringify(timerList));
		
	},[timerList]);
	
	function removeItem(idx){
		let temp = [...timerList];
		temp.splice(idx, 1);
		setTimerList(temp);
	}
	
	return <div style={{flexGrow: "1", justifyContent: "center", marginLeft: "auto", marginRight: "auto", width: "80%", marginTop: "1em", marginBottom: "1em", overflowY: "scroll", borderRadius: "15px", outline: "2px solid rgb(125, 125, 125)"}}>

		{timerList.map(function(v, i){
			
			return <Lap remove={removeItem} idx={i} key={uuid.v4()} val={v}/>
			
		})}
		
		
	</div>
}

function Main(arg){
	
	let [displayTime, setDisplayTime] = React.useState("00:00:000");

	return <div style={{marginTop: "1em"}}>
		
		<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, 150px)", gridColumnGap: "50px", gridRowGap: "20px", marginLeft: "auto", marginRight: "auto", justifyContent: "center", alignItems: "center"}}>

					<div style={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", gridColumn: "span 3", height: "6em", outline: "1px solid yellow"}}>
						<p style={{fontSize: "3em", color: "yellow"}}>{displayTime}</p>
					</div>
					<Control setter={setDisplayTime}/>
					
		</div>
		<p style={{padding: "0", marginLeft: "0", marginRight: "auto", marginBottom: "0", marginTop: "0.5em", fontSize: "2.5em", color: "rgb(225, 225, 225)", textAlign: "center" }}>Laps</p>
		
	</div>
	
}

function Page(){
	
	let [timerList, setTimerList] = React.useState([]);
	
	
	return <LapContext.Provider value={[timerList, setTimerList]}> 
	<Header/>
	<Main/>
	<Data/>
	</LapContext.Provider>

}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page/>);
