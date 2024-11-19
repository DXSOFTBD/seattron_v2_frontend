import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import NotificationCard from '@/components/common/dashboard/NotificationCard';
import Loader from '@/components/common/Loader';
import { notificationByAdmin } from 'redux/slices/notificationSlice';
import axios from '@/axios/config';

const Layout = dynamic(import('../../../components/layouts/Admin'));

const Index = () => {
  const adminInfo = useAppSelector((state) => state.adminReducer.adminInfo);
  const dispatch = useAppDispatch();
  const notification = useAppSelector(
    (state) => state.notificationReducer.notificationByAdmin.data
  );

  const status = useAppSelector(
    (state) => state.notificationReducer.notificationByAdmin.status
  );
  const handleReadNotification = async (id: any) => {
    const { data } = await axios.put(
      'notifications/admin/read',
      { id: id },
      {
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      }
    );
    dispatch(notificationByAdmin(adminInfo.token));
  };
  return (
    <Loader status={status}>
      <div className='w-full h-full dashboard_title'>
        Notices
        <div className='w-full h-full'>
          <div className='my-4'>
            {notification.length ? (
              notification.map((notice: any) => (
                <NotificationCard
                  key={notice._id}
                  data={notice}
                  handleReadNotification={handleReadNotification}
                />
              ))
            ) : (
              <p
                className='px-4 py-4 text-black bg-gray-100
                '
              >
                Empty Notification
              </p>
            )}
          </div>
        </div>
      </div>
    </Loader>
  );
};
Index.Layout = Layout;
export default Index;
