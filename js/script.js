/**
 * Monitor the light levels inside an IOT enabled snail mailbox to detect
 * when the mailbox door has been opened and closed.
 * @class IOTMailbox
 */
 class IOTMailbox {
    /**
     * Creates an instance of IOTMailbox.
     * @param {number} [signalInterval=500] Timer interval for checking mailbox status.
     * @param {function} signalCallback Function to invoke when the timer interval expires.
     * @memberof IOTMailbox
     */
    constructor(signalInterval = 500, signalCallback) {
      this.signalInterval = signalInterval;
      this.signalCallback = signalCallback;
      this.intervalID = null;
      this.lastLightLevel = 0;
    }
  
    /**
     * Start monitoring of the mailbox and invoke the caller specified callback
     * function when the interval expires.
     * @memberof IOTMailbox
     */
    startMonitoring = () => {
      const logPanel = document.querySelector('.mailbox__panel--log');
      const p = document.createElement('p');
      p.textContent = 'Starting monitoring of mailbox...';
      logPanel.append(p);
      console.log(`Starting monitoring of mailbox...`);
      this.intervalID = window.setInterval(this.signalStateChange, this.signalInterval);
    }
  
    /**
     * Stop monitoring the mailbox status
     * @memberof IOTMailbox
     */
    stopMonitoring = () => {
      if (this.intervalID === null) return;
      window.clearInterval(this.intervalID);
      this.intervalID = null;
      console.log(`Mailbox monitoring stopped...`);
    }
  
    /**
     * Pass the current light level inside the mailbox to the users callback
     * function. The positive light levels indicate the door is open while 
     * negative levels indicate it is closed. Depending on the sampling interval 
     * the mailbox door could be in any postion from fully closed to fully open. 
     * This means the light level varies from interval-to-interval.
     * @memberof IOTMailbox
     */
    signalStateChange = () => {
      
      
      const lightLevel = this.lastLightLevel >= 0 
        ? Math.random().toFixed(2) * -1 
        : Math.random().toFixed(2);
     

      console.log(`Mailbox state changed - lightLevel: ${lightLevel}`);
      
      this.signalCallback(lightLevel);
      this.lastLightLevel = lightLevel;
    }
  };

  
  
  


 

  
  //EVENT: Start Monitoring
  let mailbox;
  const interval = document.querySelector('.mailbox__monitoring-interval')
  document.querySelector('.btn--start').addEventListener('click', (e)=>{

      const callback = (lightLevel) => {
        const logPanel = document.querySelector('.mailbox__panel--log');
        const p = document.createElement('p');
        let doorState = lightLevel < 0 ? "CLOSED" : "OPEN";
        p.textContent = `lightLevel: ${lightLevel} - DOOR: ${doorState}`
        logPanel.append(p);

        if(doorState === 'OPEN') {
          const notificationPanel = document.querySelector('.mailbox__panel--notification');
          const p = document.createElement('p');
          p.textContent = 'Door: OPEN'
          notificationPanel.append(p);
        }
      }

      if(!interval.value) {
          mailbox = new IOTMailbox (500,callback);
          mailbox.startMonitoring();
          
        } else {
          mailbox = new IOTMailbox (Number(interval.value),callback);
          mailbox.startMonitoring();
        }   
  })

  //EVENT: Stop monitoring

  document.querySelector('.btn--stop').addEventListener('click',
  () => {
    mailbox.stopMonitoring()
    const logPanel = document.querySelector('.mailbox__panel--log');
    const p = document.createElement('p');
    p.textContent = 'Mailbox monitoring stopped...';
    logPanel.append(p);
  })

  //EVENT: Reset 

  document.querySelector('.btn--reset').addEventListener('click',
  () => {
    const logPanel = document.querySelector('.mailbox__panel--log');
    const notificationPanel = document.querySelector('.mailbox__panel--notification');
    logPanel.innerHTML = "";
    notificationPanel.innerHTML = "";
    interval.value = '';
  })