import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

interface ConversionHistory {
  from: string;
  to: string;
  amount: number;
  convertedValue: string;
}

interface RecentConversionsProps {
  history: ConversionHistory[];
}

const RecentConversions: React.FC<RecentConversionsProps> = ({ history }) => {
  return (
    <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Recent Conversions
      </Typography>
      {history.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No recent conversions.
        </Typography>
      ) : (
        <List>
          {history.map((conversion, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', py: 1 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="bold">
                    {conversion.amount} {conversion.from} → {conversion.convertedValue} {conversion.to}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RecentConversions;
