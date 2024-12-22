import 'react';

declare module 'react' {
  interface ReactSVG extends React.SVGProps<SVGSVGElement> {
    // Добавляем необходимые свойства для SVG
    title?: string;
    desc?: string;
  }
}
