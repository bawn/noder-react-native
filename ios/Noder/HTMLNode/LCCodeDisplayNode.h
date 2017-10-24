//
//  LCCodeDisplayNode.h
//  Test
//
//  Created by bawn on 31/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import <AsyncDisplayKit/AsyncDisplayKit.h>

@class HTMLNode;

@interface LCCodeDisplayNode : ASDisplayNode

- (instancetype)initWithContent:(HTMLNode *)htmlNode;

@end
