"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { cn } from "@/app/_lib/utils";

// Constants
const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8am to 17pm
const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const PROFESSIONALS = [
  "Todos",
  "Dra. Carla Santos",
  "Dr. Marcos Oliveira",
  "Dra. Renata Lima",
];

const appointments = [
  {
    id: 1,
    day: 1,
    hour: 9,
    patient: "Ana Silva",
    duration: 1,
    professional: "Dra. Carla Santos",
    status: "Agendado",
  },
  {
    id: 2,
    day: 1,
    hour: 14,
    patient: "Carlos Mendes",
    duration: 1,
    professional: "Dr. Marcos Oliveira",
    status: "Agendado",
  },
  {
    id: 3,
    day: 2,
    hour: 10,
    patient: "Mariana Alves",
    duration: 1,
    professional: "Dra. Carla Santos",
    status: "Agendado",
  },
  {
    id: 4,
    day: 3,
    hour: 11,
    patient: "João Pedro",
    duration: 1,
    professional: "Dra. Renata Lima",
    status: "Agendado",
  },
  {
    id: 5,
    day: 4,
    hour: 13,
    patient: "Beatriz Costa",
    duration: 1,
    professional: "Dr. Marcos Oliveira",
    status: "Agendado",
  },
];

type CalendarViewProps = {
  onAppointmentClick: (
    appointmentId: number | null,
    day: number,
    hour: number
  ) => void;
};

const CalendarView = ({ onAppointmentClick }: CalendarViewProps) => {
  const [selectedProfessional, setSelectedProfessional] = useState("Todos");
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const changeWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  const getAppointmentForSlot = (dayIndex: number, hour: number) => {
    return appointments.find(
      (app) =>
        app.day === dayIndex &&
        app.hour === hour &&
        (selectedProfessional === "Todos" ||
          app.professional === selectedProfessional)
    );
  };

  return (
    <div className='border rounded-lg bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden shadow-lg dark:shadow-xl'>
      <div className='p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 dark:border-gray-700'>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => changeWeek("prev")}
            className='text-gray-700 dark:text-gray-300'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <div className='flex items-center'>
            <CalendarIcon className='mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400' />
            <span className='font-medium text-gray-900 dark:text-white'>
              {formatMonthYear(weekDates[0])}
            </span>
          </div>
          <Button
            variant='outline'
            size='icon'
            onClick={() => changeWeek("next")}
            className='text-gray-700 dark:text-gray-300'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>

        <div className='w-full sm:w-auto'>
          <Select
            value={selectedProfessional}
            onValueChange={setSelectedProfessional}
          >
            <SelectTrigger className='w-full sm:w-[200px] dark:bg-zinc-800 dark:text-white bg-zinc-50 dark:border-zinc-800/50'>
              <SelectValue placeholder='Profissional' />
            </SelectTrigger>
            <SelectContent>
              {PROFESSIONALS.map((prof) => (
                <SelectItem key={prof} value={prof}>
                  {prof}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[768px]'>
          <div className='grid grid-cols-8 border-b dark:border-gray-700'>
            <div className='py-2 px-4 text-center font-medium text-muted-foreground dark:text-gray-400'></div>
            {weekDates.map((date, idx) => (
              <div
                key={`day-${idx}`}
                className={cn(
                  "py-2 px-4 text-center border-l dark:border-gray-700 bg-background",
                  date.toDateString() === new Date().toDateString()
                    ? "bg-emerald-50 dark:bg-emerald-600"
                    : "dark:bg-gray-700 dark:text-white"
                )}
              >
                <div className='font-medium'>{DAYS_OF_WEEK[idx]}</div>
                <div className='text-sm text-muted-foreground dark:text-gray-400'>
                  {date.getDate().toString().padStart(2, "0")}/
                  {(date.getMonth() + 1).toString().padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

          {HOURS.map((hour) => (
            <div
              key={`hour-${hour}`}
              className='grid grid-cols-8 border-b dark:border-gray-700'
            >
              <div className='py-3 px-4 text-center text-sm text-muted-foreground dark:text-gray-400 border-r flex items-center justify-center'>
                <Clock className='h-3 w-3 mr-1' />
                {hour}:00
              </div>

              {weekDates.map((_, dayIndex) => {
                const appointment = getAppointmentForSlot(dayIndex, hour);
                return (
                  <div
                    key={`cell-${dayIndex}-${hour}`}
                    className={cn(
                      "p-1 min-h-16 border-l relative bg-background",
                      weekDates[dayIndex].toDateString() ===
                        new Date().toDateString()
                        ? "bg-emerald-50 dark:bg-emerald-600"
                        : "dark:bg-gray-700"
                    )}
                    onClick={() =>
                      onAppointmentClick(
                        appointment?.id ?? null,
                        dayIndex,
                        hour
                      )
                    }
                  >
                    {appointment ? (
                      <div
                        className={cn(
                          "h-full rounded p-1 text-xs cursor-pointer hover:opacity-80",
                          appointment.status === "Agendado"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-white"
                            : ""
                        )}
                      >
                        <div className='font-medium'>{appointment.patient}</div>
                        <div className='text-xs opacity-80'>
                          {appointment.professional}
                        </div>
                      </div>
                    ) : (
                      <div className='h-full rounded p-1 text-xs border border-dashed border-gray-200 cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-600 flex items-center justify-center'>
                        <span className='sr-only'>Novo agendamento</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
