import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';

export default function SidePanel({ setIsOpen, open, title, data }) {
  const [idea, setIdea] = useState('');
  const [instruction, setInstruction] = useState('');
  useEffect(() => {
    if (!open) {
      setIdea('');
    }
  }, [open]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-primary px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold capitalize leading-6 text-white">
                              {title}
                            </Dialog.Title>
                            <p className="text-sm text-white">
                              Refine and generate ideas by using our AI
                              assistant
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <label
                            htmlFor="project-description"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Idea
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <textarea
                            id="project-description"
                            name="project-description"
                            rows={3}
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue=""
                            value={idea}
                          />
                        </div>
                      </div>
                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Project name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Instructions
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="project-name"
                              id="project-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => setInstruction(e?.target?.value)}
                            />
                          </div>
                        </div>

                        {/* Project description */}

                        {/* Privacy */}
                        <fieldset className="space-y-2 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <legend className="sr-only">Ideas/Suggestions</legend>
                          <div
                            className="text-sm font-bold leading-6 text-gray-900"
                            aria-hidden="true"
                          >
                            Select a Suggestion
                          </div>
                          <div className="mt-8 space-y-5 sm:col-span-2">
                            <div className="space-y-5 sm:mt-4">
                              {data?.map((item) => {
                                return (
                                  <div
                                    className="relative flex items-start"
                                    key={item?._id}
                                  >
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="public-access"
                                        name="privacy"
                                        aria-describedby="public-access-description"
                                        type="radio"
                                        className="text-bg-primary focus:ring-bg-primary h-4 w-4 border-gray-900"
                                        onChange={() => {
                                          setIdea(item?.text);
                                        }}
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <p
                                        id="public-access-description"
                                        className="text-gray-900"
                                      >
                                        {item?.text}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <hr className="border-gray-200" />
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-primary-bg-light px-4 py-2 text-sm text-accent duration-300 hover:bg-primary-bg-dark hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm text-white duration-300 hover:bg-primary-bg-dark"
                        >
                          Refine
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
