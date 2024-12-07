import { ComponentMapService } from "@/server/domain/services/components";
import React from "react";

export default function ComponentRenderer({ data }: any) {
  return (
    <>
      {data.map((component: any) => {
        const Component = ComponentMapService.getComponentForName(
          component.__typename
        );
        return React.createElement(Component, {
          key: component.id,
          ...component,
        });
      })}
    </>
  );
}
