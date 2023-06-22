import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import SidePanel from '@/components/SidePanel';
import { CommonLayout, DashboardLayout } from '@/layouts';
import { api } from '@/services/api';
import { pusherClient } from '@/services/pusher';
import { StoreContext } from '@/store/StoreContext';

const components = {
  event: (props: any) => {
    const getIcon = () => {
      switch (props.event.title.toLowerCase()) {
        case 'instagram': {
          return '/assets/images/instagram.png';
        }
        case 'facebook': {
          return '/assets/images/facebook.png';
        }
        case 'linkedin': {
          return '/assets/images/linkedin.png';
        }
        case 'google': {
          return '/assets/images/google.png';
        }
        case 'twitter': {
          return '/assets/images/twitter.png';
        }
        default: {
          return '/assets/images/google.png';
        }
      }
    };
    if (!props?.event?.title) {
      return null;
    }

    return (
      <button
        className="flex w-full items-center rounded-md bg-accent p-1"
        type="button"
        onClick={() =>
          props?.event?.callback(props?.event?.data, props?.event?.title)
        }
      >
        {props?.event?.title?.toLowerCase() === 'loading' ? (
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
        ) : (
          <Image src={getIcon()} height="16" width="16" alt="platform" />
        )}

        <span className="ml-2 inline-block text-sm capitalize">
          {props?.event?.title}
        </span>
      </button>
    );
  },
};

const CalendarView = ({ data }) => {
  const [allEvents, setAllEvents] = useState(data?.data || []);
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const [panelTitle, setPanelTitle] = useState('');
  const [panelData, setPanelData] = useState([]);

  const localizer = momentLocalizer(moment);
  const { state: { workSpaces: { channelDetails, calendarRange } = {} } = {} } =
    useContext(StoreContext);

  // keeps track of socket responses
  // const socketResponses = useRef([...calendarRange]);
  const socketResponses = useRef([...calendarRange]);

  useEffect(() => {
    if (channelDetails?.channel && channelDetails?.event) {
      socketResponses.current = [...calendarRange];
      const channel = pusherClient.subscribe(channelDetails?.channel);

      channel.bind(channelDetails?.event, (data: any) => {
        console.log('data', 'data received', data);
        socketResponses.current = [...socketResponses.current]?.map((item) => {
          if (
            moment(data?.date)
              .local()
              .isSame(moment(item?.date).local(), 'year') &&
            moment(data?.date)
              .local()
              .isSame(moment(item?.date).local(), 'month') &&
            moment(data?.date).local().isSame(moment(item?.date).local(), 'day')
          ) {
            return {
              ...item,
              platform: data?.platform,
              data: data?.suggestions,
            };
          }
          return { ...item };
        });

        setAllEvents(socketResponses?.current);
      });
      return () => {
        pusherClient.unsubscribe(channelDetails?.channel);
        channel.unbind(channelDetails?.event);
      };
    }
  }, [channelDetails?.channel, channelDetails?.event]);
  console.log(socketResponses?.current);
  useEffect(() => {
    if (calendarRange?.length) {
      setAllEvents(calendarRange);
    }
  }, [calendarRange]);

  const dateCallback = useCallback(
    (data: any, title: string) => {
      console.log(data);
      if (!data?.length) return;
      setSidePanelOpen(true);
      setPanelTitle(title);
      setPanelData(data);
    },
    [allEvents]
  );

  const eventsDataModified = useMemo(() => {
    return allEvents?.map((item) => {
      return {
        start: moment(item?.date)?.local()?.startOf('day').toDate(),
        end: moment(item?.date)
          ?.local()
          ?.add(1, 'days')
          ?.startOf('day')
          .toDate(),
        title: item?.platform,
        data: item?.suggestions || [],
        callback: dateCallback,
      };
    });
  }, [allEvents]);
  const handleSelectEvent = (event) => {
    console.log(event);
  };
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventsDataModified}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['month', 'day']}
        components={components}
        onSelectSlot={handleSelectEvent}
        selectable
      />
      <SidePanel
        setIsOpen={setSidePanelOpen}
        open={isSidePanelOpen}
        data={panelData}
        title={panelTitle}
      />
    </div>
  );
};

CalendarView.getLayout = (page: any) => (
  <DashboardLayout>
    <CommonLayout>{page}</CommonLayout>
  </DashboardLayout>
);

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo;
}> = async ({ params }) => {
  const { id = '' } = params;
  if (!id) {
    return {
      notFound: true,
    };
  }
  const { kind, data } = await api.fetchSingleCalendarData(id);

  if (kind !== 'ok') {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default CalendarView;
