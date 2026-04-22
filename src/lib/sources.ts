export interface Source {
  id: string;
  name: string;
  url: string;
  nonprofit: boolean;
  address: string | null;
}

export const SOURCES: Source[] = [
  {
    id: 'publicsource',
    name: 'Public Source',
    url: 'https://www.publicsource.org/',
    nonprofit: true,
    address: '1936 Fifth Avenue, Pittsburgh, PA 15219',
  },
  {
    id: 'next-pittsburgh',
    name: 'NEXTpittsburgh',
    url: 'https://nextpittsburgh.com/',
    nonprofit: false,
    address: '223 Fourth Ave, Pittsburgh, PA 15222',
  },
  {
    id: 'triblive',
    name: 'TribLIVE',
    url: 'https://triblive.com/',
    nonprofit: false,
    address: '210 Wood Street, Tarentum, PA 15084',
  },
  {
    id: 'wesa',
    name: '90.5 WESA',
    url: 'https://www.wesa.fm/',
    nonprofit: true,
    address: '67 Bedford Square, Pittsburgh, PA 15203',
  },
  {
    id: 'pittsburgh-union-progress',
    name: 'Pittsburgh Union Progress',
    url: 'https://www.unionprogress.com/',
    nonprofit: true,
    address: null,
  },
  {
    id: 'pittsburgh-post-gazette',
    name: 'Pittsburgh Post-Gazette',
    url: 'https://www.post-gazette.com/',
    nonprofit: false,
    address: '358 North Shore Drive, Suite 300, Pittsburgh, PA 15212',
  },
];
