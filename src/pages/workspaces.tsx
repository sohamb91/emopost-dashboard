import {
  CalendarDaysIcon,
  CheckIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

import CreateCalendarForm from '@/components/CreateCalendarForm';
import CustomModal from '@/components/CustomDialog';
import Form from '@/components/Form';
import { CommonLayout, DashboardLayout } from '@/layouts';
import { StoreContext } from '@/store/StoreContext';

const Workspaces = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [isGeneratingCalendar, setGenerating] = useState(false);

  const {
    fetchWorkspaces,
    setCalendarDays,
    saveChannelDetails,
    setSelectedWorkSpaceId,
    state: {
      workSpaces: {
        data = [],
        isLoading = false,
        selectedWorkSpaceId = '',
      } = {},
    } = {},
  } = useContext(StoreContext);
  const router = useRouter();
  return (
    <>
      <h2 className="mb-6 text-3xl font-bold">Your Workspaces</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <button
          className="flex  cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-primary-bg-light p-16 shadow-lg"
          onClick={openModal}
          type="button"
        >
          <div className="flex flex-col items-center">
            <PlusIcon className="h-10 w-10 text-gray-500" />
            <p className="mt-4 text-gray-900">Create a Worskpace</p>
          </div>
        </button>

        {isLoading ? (
          <>
            {[...new Array(3)]?.map((_d, _i) => {
              return (
                <div
                  key={`${Math.random().toString()}-workspace`}
                  className="flex  cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-primary-bg-light p-16 shadow-lg"
                >
                  <div className="flex w-full animate-pulse flex-col items-center space-x-4 text-center">
                    <div className="h-10 w-10 rounded-full bg-primary-bg-dark " />
                    <div className="mt-4 h-4 w-full rounded-md bg-primary-bg-dark" />
                    <div className="mt-4 h-4 w-full rounded-md bg-primary-bg-dark" />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {[...data]?.map((_d, _i) => {
              return (
                <button
                  key={`${Math.random().toString()}-workspace`}
                  className="relative  flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-primary-bg-light p-16 shadow-lg"
                  onClick={() => {
                    setSelectedWorkSpaceId(_d?._id);
                    router.push(`/calendar/${_d?._id}`);
                  }}
                  onKeyDown={() => {
                    setSelectedWorkSpaceId(_d?._id);
                    router.push(`/calendar/${_d?._id}`);
                  }}
                  type="button"
                >
                  {_d?._id === selectedWorkSpaceId ? (
                    <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon className="h-4 w-4 font-bold text-white" />
                    </div>
                  ) : null}
                  <div className="flex w-full flex-col items-center justify-center text-center">
                    <CalendarDaysIcon className="h-10 w-10 text-gray-600" />
                    <div className="mt-4 ">{_d?.name}</div>
                  </div>
                </button>
              );
            })}
          </>
        )}
      </div>

      <CustomModal
        isOpen={isOpen}
        setIsOpen={closeModal}
        title="Create a workspace"
      >
        <Form>
          {({ onFormChange, submitForm }) => {
            return (
              <>
                <CreateCalendarForm
                  onFieldChange={onFormChange}
                  formName="create_calendar"
                />
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-primary-bg-light px-4 py-2 text-sm text-accent duration-300 hover:bg-primary-bg-dark hover:text-white"
                    onClick={closeModal}
                    disabled={isGeneratingCalendar}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm text-white duration-300 hover:bg-primary-bg-dark"
                    disabled={isGeneratingCalendar}
                    onClick={async () => {
                      try {
                        setGenerating(true);
                        const { channelData, calendarId, days } =
                          await submitForm('create_calendar');
                        saveChannelDetails(channelData);
                        setCalendarDays(days?.start, days?.range);
                        closeModal();
                        await fetchWorkspaces();
                        router?.push(`/calendar/${calendarId}`);
                      } catch (e: any) {
                        console.log('error', e.message);
                      } finally {
                        setGenerating(false);
                      }
                    }}
                  >
                    {isGeneratingCalendar ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="mr-2 h-4 w-4 animate-spin fill-white text-gray-500 dark:text-gray-500"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : null}
                    Create
                  </button>
                </div>
              </>
            );
          }}
        </Form>
      </CustomModal>
    </>
  );
};

Workspaces.getLayout = (page: any) => (
  <DashboardLayout>
    <CommonLayout>{page}</CommonLayout>
  </DashboardLayout>
);

export default Workspaces;
