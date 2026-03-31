type NoDataProps = {
  title?: string;
};

export const AppNoData = ({ title = 'No data' }: NoDataProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px 0',
    }}
  >
    <span style={{ color: 'var(--black)', fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{title}</span>
  </div>
);
