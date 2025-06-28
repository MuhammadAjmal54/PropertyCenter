// components/announcement/AnnouncementCard.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { formatDate } from '../../utils/format';

const AnnouncementCard = ({ announcement }) => {
  const { title, content, date } = announcement;

  return (
    <Card className="h-full">
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-800">{title}</h3>
        
        <div className="flex items-center text-gray-500 mt-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">{formatDate(date)}</span>
        </div>
        
        <div className="mt-4 text-gray-600">
          <p>{content}</p>
        </div>
      </div>
    </Card>
  );
};

export default AnnouncementCard;
