const CornerDecoration = ({ color = 'neon-cyan' }) => (
  <>
    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-${color}`} />
    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-${color}`} />
    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-${color}`} />
    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-${color}`} />
  </>
);

export default CornerDecoration;
