import { useState } from 'react';
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const scheduledDays = [
    { day: 3, month: 3, year: 2025 },
    { day: 7, month: 3, year: 2025 },
    { day: 12, month: 3, year: 2025 },
    { day: 15, month: 3, year: 2025 },
    { day: 18, month: 3, year: 2025 },
    { day: 22, month: 3, year: 2025 },
    { day: 25, month: 3, year: 2025 },
    { day: 29, month: 3, year: 2025 },
    { day: 5, month: 4, year: 2025 },
    { day: 10, month: 4, year: 2025 },
    { day: 15, month: 4, year: 2025 },
  ];

  const [notifications, setNotifications] = useState([
    { id: 1, text: "HR from TechCorp has scheduled an interview for April 15", read: false, date: new Date(2025, 3, 15) },
    { id: 2, text: "Reminder: Interview with DesignHub at 2:00 PM tomorrow", read: true, date: new Date(2025, 3, 18) },
    { id: 3, text: "New job posting matches your profile", read: false },
    { id: 4, text: "Follow-up required for application on April 3", read: false, date: new Date(2025, 3, 3) },
    { id: 5, text: "Interview preparation materials sent for April 22", read: true, date: new Date(2025, 3, 22) },
    { id: 6, text: "Upcoming interview with FinTech Inc on May 10", read: false, date: new Date(2025, 4, 10) },
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' or 'notifications'

  // Handle window resize
  useState(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    return [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  };

  const calendarDays = generateCalendarDays();

  const hasScheduledInterview = (day) => day && scheduledDays.some(
    d => d.day === day && d.month === currentMonth && d.year === currentYear
  );

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (offset) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
    setSelectedDate(null);
    setFilteredNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filterNotificationsByDate = (day) => {
    if (!day) return;
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
    setFilteredNotifications(
      notifications.filter(n => 
        n.date &&
        n.date.getDate() === day &&
        n.date.getMonth() === currentMonth &&
        n.date.getFullYear() === currentYear
      )
    );
    if (isMobileView) setActiveTab('notifications');
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
    setFilteredNotifications([]);
    if (isMobileView) setActiveTab('calendar');
  };

  const formatDateDisplay = (date) => date ? `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` : '';

  return (
    <div className="max-w-[1800px] mx-auto p-2 sm:p-4 md:p-6">
    
      {isMobileView && (
        <div className="flex mb-4 border-b border-gray-200">
          <button
            className={`flex-1 py-2 font-medium ${activeTab === 'calendar' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button
            className={`flex-1 py-2 font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
        {(isMobileView && activeTab === 'calendar') || !isMobileView ? (
          <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-md flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-1 md:p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mx-2 text-center">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button 
                onClick={() => changeMonth(1)}
                className="p-1 md:p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 mb-4 md:mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-600 text-xs sm:text-sm md:text-base py-1">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`min-h-[30px] sm:min-h-[40px] md:min-h-[50px] lg:min-h-[60px] flex items-center justify-center rounded-lg text-xs sm:text-sm md:text-base
                    ${day ? 
                      (hasScheduledInterview(day) ? 
                        'bg-[#0F52BA] text-white cursor-pointer' : 
                        'bg-gray-100 hover:bg-gray-200 cursor-pointer')
                      : 'bg-transparent'
                    }
                    ${selectedDate?.getDate() === day && 
                     selectedDate?.getMonth() === currentMonth && 
                     selectedDate?.getFullYear() === currentYear ? 
                      'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                  onClick={() => filterNotificationsByDate(day)}
                >
                  {day || ''}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#0F52BA] rounded mr-1 sm:mr-2"></div>
                <span className="text-xs sm:text-sm text-gray-600">Scheduled</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 rounded mr-1 sm:mr-2"></div>
                <span className="text-xs sm:text-sm text-gray-600">Available</span>
              </div>
              {selectedDate && (
                <button 
                  onClick={clearDateFilter}
                  className="ml-auto text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        ) : null}

        {(isMobileView && activeTab === 'notifications') || !isMobileView ? (
          <div className={`bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-md ${isMobileView ? 'w-full' : 'w-full lg:w-[400px] xl:w-[450px]'} min-w-0`}>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                <Bell size={18} className="mr-2 md:w-5 md:h-5" />
                Notifications
              </h3>
              {selectedDate && (
                <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full">
                  {formatDateDisplay(selectedDate)}
                </span>
              )}
            </div>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4 overflow-y-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
              {(selectedDate ? filteredNotifications : notifications).length > 0 ? (
                (selectedDate ? filteredNotifications : notifications).map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 sm:p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p className={`${notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'} text-xs sm:text-sm md:text-base`}>
                      {notification.text}
                    </p>
                    {notification.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDateDisplay(notification.date)}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 md:py-8">
                  <p className="text-gray-500 text-sm md:text-base">
                    {selectedDate 
                      ? `No notifications for ${formatDateDisplay(selectedDate)}`
                      : 'No new notifications'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}