/**
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This function formats a given date in string format to 
 * the form MMMM YYYY.
 */

const
  formatter = new Intl.DateTimeFormat('en', { month: 'long' });

export default function formatDate(jsonDate: string) {
    const 
      date = new Date(jsonDate);

    return formatter.format(date) + " " + date.getFullYear();
}
