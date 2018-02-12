import _ from 'underscore';
import { assert } from 'chai';
import coder from '../packages/web3-eth-abi';

const paramTests = [
    {
        type: 'address',
        expected: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1',
        value: [
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'
        ]
    },

    {
        type: 'address[2]',
        expected: [
            '0x407D73d8a49eeb85D32Cf465507dd71d507100c1',
            '0x407D73d8A49eEB85D32Cf465507Dd71d507100c3'
        ],
        value: [
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3'
        ]
    },
    {
        type: 'address[]',
        expected: [
            '0x407D73d8a49eeb85D32Cf465507dd71d507100c1',
            '0x407D73d8A49eEB85D32Cf465507Dd71d507100c3'
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3'
        ]
    },
    {
        type: 'address[][2]',
        expected: [
            ['0x407D73d8a49eeb85D32Cf465507dd71d507100c1', '0x407d73d8a49EEB85d32Cf465507dD71D507100c2'],
            ['0x407D73d8A49eEB85D32Cf465507Dd71d507100c3', '0x407D73d8a49eeb85D32CF465507dd71d507100C4']
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000040',
            '00000000000000000000000000000000000000000000000000000000000000a0',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4'
        ]
    },
    {
        type: 'address[2][]',
        expected: [
            ['0x407D73d8a49eeb85D32Cf465507dd71d507100c1', '0x407d73d8a49EEB85d32Cf465507dD71D507100c2'],
            ['0x407D73d8A49eEB85D32Cf465507Dd71d507100c3', '0x407D73d8a49eeb85D32CF465507dd71d507100C4']
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4'
        ]
    },
    {
        type: 'address[][]',
        expected: [
            ['0x407D73d8a49eeb85D32Cf465507dd71d507100c1', '0x407d73d8a49EEB85d32Cf465507dD71D507100c2'],
            ['0x407D73d8A49eEB85D32Cf465507Dd71d507100c3', '0x407D73d8a49eeb85D32CF465507dd71d507100C4']
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000080',
            '00000000000000000000000000000000000000000000000000000000000000e0',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4'
        ]
    },
    {
        type: 'bool',
        expected: true,
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'bool',
        expected: false,
        value: [
            '0000000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'bool[2]',
        expected: [true, false],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'bool[]',
        expected: [true, true, false],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'int',
        expected: '1',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'int',
        expected: '1',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'int',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'int',
        expected: '-1',
        value: [
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        ]
    },
    {
        type: 'int256',
        expected: '1',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'int256',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'int256',
        expected: '-1',
        value: [
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        ]
    },
    {
        type: 'int8',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'int8[2]',
        expected: ['16', '2'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010',
            '0000000000000000000000000000000000000000000000000000000000000002'
        ]
    },
    {
        type: 'int32',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'int64',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'int128',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'int[]',
        expected: [],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'int[]',
        expected: ['3'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000003'
        ]
    },
    {
        type: 'int256[]',
        expected: ['3'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000003'
        ]
    },
    {
        type: 'int[]',
        expected: ['1', '2', '3'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003'
        ]
    },
    {
        type: 'int[3][]',
        expected: [
            ['1', '2', '3'],
            ['4', '5', '6']
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000004',
            '0000000000000000000000000000000000000000000000000000000000000005',
            '0000000000000000000000000000000000000000000000000000000000000006'
        ]
    },

    {
        type: 'uint',
        expected: '1',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'uint',
        expected: '1',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'uint',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'uint',
        expected: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        value: [
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        ]
    },
    {
        type: 'uint256',
        expected: '1',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        type: 'uint256',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'uint8',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'uint32',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'uint64',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'uint128',
        expected: '16',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000010'
        ]
    },
    {
        type: 'uint[]',
        expected: [],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'uint[]',
        expected: ['3'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000003'
        ]
    },
    {
        type: 'uint256[]',
        expected: ['3'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000003'
        ]
    },
    {
        type: 'uint[]',
        expected: ['1', '2', '3'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003'
        ]
    },
    {
        type: 'uint[3][]',
        expected: [['1', '2', '3'], ['4', '5', '6']],
        value: ['0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000004',
            '0000000000000000000000000000000000000000000000000000000000000005',
            '0000000000000000000000000000000000000000000000000000000000000006'
        ]
    },
    {
        type: 'bytes',
        expected: '0x6761766f66796f726b',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000009',
            '6761766f66796f726b0000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'bytes',
        expected: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ]
    },
    {
        type: 'bytes',
        expected: [
            '0x',
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ].join(''),
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000060',
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ]
    },
    {
        type: 'bytes',
        expected: [
            '0x',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ].join(''),
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000040',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ]
    },
    {
        type: 'bytes[2]',
        expected: [
            '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134a',
            '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000040',
            '0000000000000000000000000000000000000000000000000000000000000080',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134a',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ]
    },
    {
        type: 'bytes[][2]',
        expected: [
            [
                '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134a'
            ],
            [
                [
                    '0x',
                    '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
                    '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134c'
                ].join(''),
                '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134d'
            ]
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000040',
            '0000000000000000000000000000000000000000000000000000000000000080',
            '0000000000000000000000000000000000000000000000000000000000000001',
            '00000000000000000000000000000000000000000000000000000000000000e0',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000120',
            '0000000000000000000000000000000000000000000000000000000000000180',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134a',
            '0000000000000000000000000000000000000000000000000000000000000040',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134c',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134d'
        ]
    },
    {
        type: 'bytes1',
        expected: '0xcf',
        value: [
            'cf00000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'bytes1[4]',
        expected: ['0xcf', '0x68', '0x4d', '0xfb'],
        value: [
            'cf00000000000000000000000000000000000000000000000000000000000000',
            '6800000000000000000000000000000000000000000000000000000000000000',
            '4d00000000000000000000000000000000000000000000000000000000000000',
            'fb00000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'bytes32',
        expected: '0x6761766f66796f726b0000000000000000000000000000000000000000000000',
        value: [
            '6761766f66796f726b0000000000000000000000000000000000000000000000'
        ]
    },

    {
        type: 'string',
        expected: 'gavofyork',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000009',
            '6761766f66796f726b0000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'string',
        expected: 'Ã¤Ã¤',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000008',
            'c383c2a4c383c2a4000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'string',
        expected: 'ü',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            'c3bc000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'string',
        expected: 'Ã',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000002',
            'c383000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'string',
        expected: 'Heeäööä👅D34ɝɣ24Єͽ-.,äü+#/',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000026',
            '486565c3a4c3b6c3b6c3a4f09f9185443334c99dc9a33234d084cdbd2d2e2cc3',
            'a4c3bc2b232f0000000000000000000000000000000000000000000000000000'
        ]
    },

    {
        type: 'bytes',
        expected: '0xc3a40000c3a4',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '0000000000000000000000000000000000000000000000000000000000000006',
            'c3a40000c3a40000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'bytes32',
        expected: '0xc3a40000c3a40000000000000000000000000000000000000000000000000000',
        value: [
            'c3a40000c3a40000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        type: 'address',
        expected: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1',
        value: [
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'
        ]
    },
    {
        type: 'string',
        expected: 'welcome to ethereum. welcome to ethereum. welcome to ethereum.',
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '000000000000000000000000000000000000000000000000000000000000003e',
            '77656c636f6d6520746f20657468657265756d2e2077656c636f6d6520746f20',
            '657468657265756d2e2077656c636f6d6520746f20657468657265756d2e0000'
        ]
    },
    {
        type: 'bytes',
        expected: [
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1'
        ].join(''),
        value: [
            '0000000000000000000000000000000000000000000000000000000000000020',
            '000000000000000000000000000000000000000000000000000000000000009f',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff100'
        ]
    }
];

const paramsTests = [
    {
        types: ['address'],
        expected: ['0x407D73d8a49eeb85D32Cf465507dd71d507100c1'],
        value: [
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'
        ]
    },
    {
        types: ['address', 'address'],
        expected: [
            '0x407D73d8a49eeb85D32Cf465507dd71d507100c1',
            '0x407D73d8A49eEB85D32Cf465507Dd71d507100c3'
        ],
        value: [
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3'
        ]
    },
    {
        types: ['bool[2]', 'bool[3]'],
        expected: [[true, false], [false, false, true]],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        types: ['int[2]', 'int256[3]'],
        expected: [['1', '2'], ['3', '4', '5']],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000004',
            '0000000000000000000000000000000000000000000000000000000000000005'
        ]
    },
    {
        types: ['int'],
        expected: ['1'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        types: ['uint[2]', 'uint256[3]'],
        expected: [['1', '2'], ['3', '4', '5']],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000004',
            '0000000000000000000000000000000000000000000000000000000000000005'
        ]
    },
    {
        types: ['uint'],
        expected: ['1'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        types: ['bytes1', 'bytes1'],
        expected: ['0xaa', '0xbb'],
        value: [
            'aa00000000000000000000000000000000000000000000000000000000000000',
            'bb00000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        types: ['bytes1[2]', 'bytes1'],
        expected: [
            ['0xaa', '0xbb'],
            '0xcc'
        ],
        value: [
            'aa00000000000000000000000000000000000000000000000000000000000000',
            'bb00000000000000000000000000000000000000000000000000000000000000',
            'cc00000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        types: ['bytes', 'bytes'],
        expected: [
            '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134c'
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000040',
            '0000000000000000000000000000000000000000000000000000000000000080',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '0000000000000000000000000000000000000000000000000000000000000020',
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134c'
        ]
    },
    {
        types: ['int', 'string', 'int'],
        expected: ['1', 'gavofyork', '5'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000060',
            '0000000000000000000000000000000000000000000000000000000000000005',
            '0000000000000000000000000000000000000000000000000000000000000009',
            '6761766f66796f726b0000000000000000000000000000000000000000000000'
        ]
    },
    {
        types: ['bytes32', 'int'],
        expected: [
            '0x6761766f66796f726b0000000000000000000000000000000000000000000000',
            '5'
        ],
        value: [
            '6761766f66796f726b0000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000005'
        ]
    },
    {
        types: ['int', 'bytes32'],
        expected: ['5', '0x6761766f66796f726b0000000000000000000000000000000000000000000000'],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000005',
            '6761766f66796f726b0000000000000000000000000000000000000000000000'
        ]
    },
    {
        types: ['int', 'string', 'int', 'int', 'int', 'int[]'],
        expected: [
            '1', 'gavofyork', '2', '3', '4',
            ['5', '6', '7']
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '00000000000000000000000000000000000000000000000000000000000000c0',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000004',
            '0000000000000000000000000000000000000000000000000000000000000100',
            '0000000000000000000000000000000000000000000000000000000000000009',
            '6761766f66796f726b0000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '0000000000000000000000000000000000000000000000000000000000000005',
            '0000000000000000000000000000000000000000000000000000000000000006',
            '0000000000000000000000000000000000000000000000000000000000000007'
        ]
    },
    {
        types: ['int', 'bytes', 'int', 'bytes'],
        expected: [
            '5',
            [
                '0x',
                '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
                '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
            ].join(''),
            '3',
            [
                '0x',
                '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
                '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
            ].join('')
        ],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000005',
            '0000000000000000000000000000000000000000000000000000000000000080',
            '0000000000000000000000000000000000000000000000000000000000000003',
            '00000000000000000000000000000000000000000000000000000000000000e0',
            '0000000000000000000000000000000000000000000000000000000000000040',
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '0000000000000000000000000000000000000000000000000000000000000040',
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'
        ]
    },
    {
        types: ['address[2][1]', 'bool'],
        expected: [
            [
                [
                    '0x407D73d8a49eeb85D32Cf465507dd71d507100c1',
                    '0x407D73d8A49eEB85D32Cf465507Dd71d507100c3'
                ]
            ],
            false
        ],
        value: [
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1',
            '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3',
            '0000000000000000000000000000000000000000000000000000000000000000'
        ]
    },
    {
        types: ['bool[2][1]', 'bool'],
        expected: [[[true, false]], true],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        types: ['bytes1[2][1]', 'bool'],
        expected: [[['0xaa', '0xbb']], true],
        value: [
            'aa00000000000000000000000000000000000000000000000000000000000000',
            'bb00000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        types: ['int[2][1]', 'bool'],
        expected: [[['1', '2']], true],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    },
    {
        types: ['uint[2][1]', 'bool'],
        expected: [[['1', '2']], true],
        value: [
            '0000000000000000000000000000000000000000000000000000000000000001',
            '0000000000000000000000000000000000000000000000000000000000000002',
            '0000000000000000000000000000000000000000000000000000000000000001'
        ]
    }
];

describe('lib/solidity/coder', () => {
    describe('decodeParam', () => {
        _.each(paramTests, (t) => {
            it(`should turn ${t.type}: ${t.value} to ${t.expected}`, () => {
                const value = t.value.join('');
                assert.deepEqual(coder.decodeParameter(t.type, value), t.expected);
            });
        });
    });

    describe('decodeParams', () => {
        _.each(paramsTests, (t) => {
            it(`should turn ${t.values} to ${t.expected}`, () => {
                const value = t.value.join('');
                const result = coder.decodeParameters(t.types, value);

                const resultArray = [];
                _.each(result, (res, key) => {
                    if (_.isFinite(key)) {
                        resultArray.push(res);
                    }
                });

                assert.deepEqual(resultArray, t.expected);
            });
        });
    });
});
