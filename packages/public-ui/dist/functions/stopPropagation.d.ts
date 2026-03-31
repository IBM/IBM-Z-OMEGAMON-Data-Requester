/** A callback that can be used to stop event propagation so you don't need to
 * invoke 'useCallback' all the time just to stop some event from bubbling further.
 *
 * It's not a component, but it only makes sense in context of component's callback
 * so let it live in common/components.
 */
export declare function stopPropagation(event: React.MouseEvent): void;
