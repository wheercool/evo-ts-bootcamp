import { createRef, MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import { useStore } from '../../store';
import style from './Canvas.module.css';

export function Canvas() {
  const renderer = useStore('Renderer');
  const controller = useStore('Controller');
  const onClick = useCallback<MouseEventHandler>((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const x = event.clientX - rect.left;
    controller.toggleCellAt(x, y);
  }, [controller]);
  const ref = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    renderer.init(ref.current);
    return () => {
      renderer.dispose();
    }
  });
  return <div className={style.canvasWrapper}><canvas onMouseDown={onClick} ref={ref} className={style.canvas}/></div>
}
