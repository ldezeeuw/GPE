import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
    <DockMonitor
      defaultPosition="right"
      defaultIsVisible={false}
      toggleVisibilityKey="H"
      changePositionKey="W"
      changeMonitorKey="M"
    >
        <LogMonitor />
    </DockMonitor>
)
