import Router, { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { adminLogout } from 'redux/slices/adminSlice';
import { agentLogout } from 'redux/slices/agentSlice';
import { checkerLogout } from 'redux/slices/checkerSlice';
import { setPopup } from 'redux/slices/popupslice';

const ProtectRoute = ({ children }: any) => {
  const isAgent = useAppSelector((state) => state.agentReducer.success);
  const isAdmin = useAppSelector((state) => state.adminReducer.success);
  const isMerchant = useAppSelector((state) => state.checkerReducer.success);
  const agent = useAppSelector((state) => state.agentReducer.agentInfo);
  const admin = useAppSelector((state) => state.adminReducer.adminInfo);
  const checker = useAppSelector(
    (state: any) => state.checkerReducer.checkerInfo
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname } = router;

  //start token expire
  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  if (agent) {
    const decodedJwt = parseJwt(agent?.token);

    if (decodedJwt?.exp * 1000 < Date.now()) {
      dispatch(agentLogout());
      dispatch(
        setPopup({
          type: 'warning',
          message: 'Your session has been expired, please log in',
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(setPopup({ show: false, type: '', message: '' }));
      }, 5000);
    }
  }
  if (admin) {
    const decodedJwt = parseJwt(admin?.token);

    if (decodedJwt?.exp * 1000 < Date.now()) {
      dispatch(adminLogout());
      dispatch(
        setPopup({
          type: 'warning',
          message: 'Your session has been expired, please log in',
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(setPopup({ show: false, type: '', message: '' }));
      }, 5000);
    }
  }
  if (checker) {
    const decodedJwt = parseJwt(checker?.token);

    if (decodedJwt?.exp * 1000 < Date.now()) {
      dispatch(checkerLogout());
      dispatch(
        setPopup({
          type: 'warning',
          message: 'Your session has been expired, please log in',
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(setPopup({ show: false, type: '', message: '' }));
      }, 7000);
    }
  }
  // end token expire
  if (typeof window === 'undefined') {
    return <></>;
  } else if (pathname.includes('/merchant/dashboard')) {
    if (isAgent) {
      return <>{children}</>;
    } else {
      Router.push('/merchant');
    }
  } else if (pathname.includes('/admin/dashboard')) {
    if (isAdmin) {
      return <>{children}</>;
    } else {
      Router.push('/admin');
    }
  } else if (pathname.includes('/ticket-checker/dashboard')) {
    if (isMerchant) {
      return <>{children}</>;
    } else {
      Router.push('/ticket-checker');
    }
  } else {
    return <>{children}</>;
  }
  return <></>;
};

export default ProtectRoute;
