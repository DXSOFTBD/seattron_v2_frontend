
import dynamic from 'next/dynamic';


const Layout = dynamic(import('../../components/layouts/Primary'));
const EventDetails = dynamic(
  import('../../components/private/eventDetails/eventDetails')
);
const Index = () => {

  return (
    <div>
      <EventDetails
      />
    </div>
  );
};

Index.Layout = Layout;
export default Index;


