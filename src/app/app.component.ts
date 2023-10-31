import { Component, ElementRef, ViewChild } from '@angular/core';

import { newInstance } from '@jsplumb/browser-ui';
import { BezierConnector } from '@jsplumb/connector-bezier';
import { DotEndpoint } from '@jsplumb/core';
import { AnchorLocations } from '@jsplumb/common';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('container') container!: ElementRef<HTMLElement>;

  async ngAfterViewInit(): Promise<void> {
    const container = this.container.nativeElement;

    // init jsplumb
    const configs: any = {
      // dragOptions: { cursor: 'pointer', zIndex: 2000 },
      // paintStyle: { stroke: '#666' },
      // endpointHoverStyle: { fill: "orange" },
      // hoverPaintStyle: { stroke: "orange" },
      // endpointStyle: { width: 20, height: 16, stroke: '#666' },
      // endpoint: 'Rectangle',
      // anchors: ["Top", "Bottom"],
      // anchors:['Right', 'Left'],
      // anchors: ['Left', 'Continuous'],
      anchor: AnchorLocations.Left,
      anchors: [AnchorLocations.Left, AnchorLocations.Right],
      container: container,
      // dropOptions:{activeClass:"dragActive", hoverClass:"dropHover"},
      connector: {
        type: BezierConnector.type,
        options: {
          curviness: 30,
        },
      },
    };

    var instance: any = newInstance(configs);

    const sourceElement: any = document.querySelector(`#test-1`),
      sourceEndpointConfigs: any = {
        endpoint: {
          type: DotEndpoint.type,
          options: {
            radius: 5,
          },
          // connectorOverlays:[
          //   // { type:"Arrow", options:{ width:10, length:20, location:1, id:"arrow" } },
          //   // { type:"Label", options:{ label:"foo", id:"label" } }
          // ],
          anchor: AnchorLocations.Left,
          anchors: [AnchorLocations.Left, AnchorLocations.Right],
          // anchor:{ type:"Continuous", options:{ faces:[ "top", "left" ] } }
          // anchors:["Right", "Left" ],
        },
      };

    const targetElement: any = document.querySelector(`#test-2`),
      targetEndpointConfigs: any = sourceEndpointConfigs;

    const connectionConfigs = {
      source: instance.addEndpoint(sourceElement, sourceEndpointConfigs),
      target: instance.addEndpoint(targetElement, targetEndpointConfigs),
      connector: {
        type: BezierConnector.type,
        options: {
          curviness: 50,
        },
      },
      overlays: [
        { type:"Arrow", options:{location:1}},
        {
          type: 'Label',
          options: {
            label: 'testa',
            location: 0.25,
            id: 'myLabel',
          },
        },
      ],
    };

    instance.connect(connectionConfigs);
  }
}
