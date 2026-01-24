export default function NotFound() {
  return (
    <div
      className="text-white"
      style={{
        padding: '15rem 0rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'normal',
        gap: '1rem',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',
          borderRight: '1px solid #A1A1A1',
          padding: '1rem',
          fontWeight: 'bold',
        }}
        className="text-white "
      >
        404
      </div>
      <p style={{ fontSize: '1rem' }} className="text-white">
        This page could not be found.
      </p>
    </div>
  );
}
